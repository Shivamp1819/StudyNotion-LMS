const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const passwordResetTemplate = require("../mail/templates/passwordResetTemplate")

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `This Email: ${email} is not registered with us. Please enter a valid registered email.`,
      })
    }
    const token = crypto.randomBytes(20).toString("hex")

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    )
    console.log("DETAILS", updatedDetails)

    // Dynamically determine current frontend domain (e.g. http://localhost:3000)
    let clientUrl = process.env.FRONTEND_URL
    if (!clientUrl) {
      const origin = req.headers.origin || req.headers.referer
      if (origin) {
        try {
          clientUrl = new URL(origin).origin
        } catch (e) {
          clientUrl = "http://localhost:3000"
        }
      } else {
        clientUrl = "http://localhost:3000"
      }
    }

    const url = `${clientUrl}/update-password/${token}`

    await mailSender(
      email,
      "StudyNotion - Password Reset Link",
      passwordResetTemplate(url, `${user.firstName} ${user.lastName}`)
    )

    res.json({
      success: true,
      message:
        "Email sent successfully. Please check your inbox to reset your password.",
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: `Error sending password reset email: ${error.message}`,
    })
  }
}

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Reset token is missing. Please use the reset link sent to your email.",
      })
    }

    if (confirmPassword !== password) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      })
    }

    const userDetails = await User.findOne({ token: token })
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Password reset link is invalid or already used. Please request a new link.",
      })
    }

    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: "Password reset link has expired. Please request a new one.",
      })
    }

    const encryptedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { token: token },
      {
        password: encryptedPassword,
        token: null,
        resetPasswordExpires: null,
      },
      { new: true }
    )

    res.status(200).json({
      success: true,
      message: "Password reset successful! You can now log in.",
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      success: false,
      message: `Failed to update password: ${error.message}`,
    })
  }
}
