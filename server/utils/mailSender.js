const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    const cleanPass = process.env.MAIL_PASS ? process.env.MAIL_PASS.replace(/\s+/g, "") : ""

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: 587,
      secure: false, // Standard Port 587 with STARTTLS (avoids cloud firewall timeouts on port 465)
      auth: {
        user: process.env.MAIL_USER,
        pass: cleanPass || process.env.MAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      tls: {
        rejectUnauthorized: false,
      },
    })

    const info = await transporter.sendMail({
      from: `"StudyNotion - Online Education" <${process.env.MAIL_USER}>`,
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    })

    console.log("Email info: ", info.response || info)
    return info
  } catch (error) {
    console.error("Error occurred while sending mail in mailSender: ", error.message)
    throw error
  }
}

module.exports = mailSender

