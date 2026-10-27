const Booking = require("../models/bookingModel");
exports.cleanupOldBookings = async () => {
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const r = await Booking.deleteMany({ status: "cancelled", updatedAt: { $lt: cutoff } });
  console.log(`🧹 Cleanup: removed ${r.deletedCount} old cancelled bookings`);
};
