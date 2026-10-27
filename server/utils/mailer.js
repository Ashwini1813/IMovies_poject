const nodemailer = require("nodemailer");
const enabled = () => process.env.EMAIL_USER && process.env.EMAIL_PASS;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});
exports.verifyTransport = async () => {
  if (!enabled()) return console.log("ℹ️  Email not configured - notifications disabled");
  try { await transporter.verify(); console.log("✅ Mail transport ready"); }
  catch (e) { console.error("❌ Mail transport error:", e.message); }
};
exports.sendMail = async (to, subject, html) => {
  if (!enabled()) return;
  try { await transporter.sendMail({ from: `iMovies <${process.env.EMAIL_USER}>`, to, subject, html }); }
  catch (e) { console.error("Mail error:", e.message); }
};
