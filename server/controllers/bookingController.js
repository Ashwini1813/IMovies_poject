const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const User = require("../models/userModel");
const { sendMail } = require("../utils/mailer");

exports.create = async (req, res, next) => {
  try {
    const { showId, seats, paymentMethod = "card" } = req.body;
    if (!Array.isArray(seats) || !seats.length || seats.length > 10)
      return res.status(400).json({ message: "Select 1 to 10 seats" });
    const show = await Show.findById(showId).populate("movie theatre");
    if (!show) return res.status(404).json({ message: "Show not found" });
    // Atomic seat lock: succeeds only if none of the seats are already booked (prevents double booking)
    const locked = await Show.findOneAndUpdate(
      { _id: showId, bookedSeats: { $nin: seats } },
      { $push: { bookedSeats: { $each: seats } } }, { new: true });
    if (!locked) return res.status(409).json({ message: "Some seats were just booked. Please pick again." });
    const booking = await Booking.create({
      user: req.user.id, show: showId, seats, totalAmount: seats.length * show.price,
      payment: { method: paymentMethod, status: "success", transactionId: "TXN" + Date.now() }, // simulated gateway
    });
    const user = await User.findById(req.user.id);
    sendMail(user.email, `Booking confirmed - ${show.movie.title}`,
      `<h3>Booking ${booking._id}</h3><p>${show.movie.title} | ${show.theatre.name}<br>${show.date} ${show.time}<br>Seats: ${seats.join(", ")}<br>Paid: ₹${booking.totalAmount}</p>`);
    res.status(201).json(booking);
  } catch (e) { next(e); }
};
const pop = { path: "show", populate: ["movie", "theatre"] };
exports.mine = async (req, res, next) => {
  try { res.json(await Booking.find({ user: req.user.id }).populate(pop).sort("-createdAt")); } catch (e) { next(e); }
};
exports.all = async (req, res, next) => {
  try { res.json(await Booking.find().populate("user", "name email").populate(pop).sort("-createdAt")); } catch (e) { next(e); }
};
exports.cancel = async (req, res, next) => {
  try {
    const b = await Booking.findById(req.params.id);
    if (!b) return res.status(404).json({ message: "Booking not found" });
    if (req.user.role !== "admin" && String(b.user) !== req.user.id) return res.status(403).json({ message: "Not allowed" });
    if (b.status === "cancelled") return res.status(400).json({ message: "Already cancelled" });
    b.status = "cancelled"; b.payment.status = "refunded"; await b.save();
    await Show.findByIdAndUpdate(b.show, { $pull: { bookedSeats: { $in: b.seats } } }); // release seats
    res.json(b);
  } catch (e) { next(e); }
};
