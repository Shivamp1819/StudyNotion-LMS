const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  // Set CORS headers so Render or any client can call this over HTTPS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const { email, title, body } = req.body;

    if (!email || !title || !body) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const mailUser = "mrspsidhauli@gmail.com";
    const mailPass = "gyutqfvtgfgsrreh";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion - Online Education" <${mailUser}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully via Vercel function:", info.response);
    return res.status(200).json({ success: true, message: "Email sent successfully", messageId: info.messageId });
  } catch (error) {
    console.error("Vercel email sending error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
