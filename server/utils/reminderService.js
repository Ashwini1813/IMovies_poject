const Booking = require("../models/bookingModel");
const { sendMail } = require("./mailer");
exports.sendReminderEmails = async () => {
  const d = new Date(); d.setDate(d.getDate() + 1);
  const tomorrow = d.toISOString().slice(0, 10);
  const bookings = await Booking.find({ status: "confirmed" })
    .populate("user", "name email")
    .populate({ path: "show", populate: ["movie", "theatre"] });
  for (const b of bookings.filter((b) => b.show?.date === tomorrow)) {
    await sendMail(b.user.email, "Reminder: your movie is tomorrow 🎬",
      `<p>Hi ${b.user.name}, ${b.show.movie.title} at ${b.show.theatre.name} - ${b.show.time}. Seats: ${b.seats.join(", ")}</p>`);
  }
};
