const nodemailer = require("nodemailer")

let cachedTransporter = null

const getTransporter = () => {
  if (cachedTransporter) return cachedTransporter

  const cleanPass = process.env.MAIL_PASS ? process.env.MAIL_PASS.replace(/\s+/g, "") : ""

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: 465,
    secure: true,
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    auth: {
      user: process.env.MAIL_USER,
      pass: cleanPass || process.env.MAIL_PASS,
    },
  })

  return cachedTransporter
}

const mailSender = async (email, title, body) => {
  try {
    const transporter = getTransporter()

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
    cachedTransporter = null
    throw error
  }
}

module.exports = mailSender

