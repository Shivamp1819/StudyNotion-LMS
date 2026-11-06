// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendotp,
  changePassword,
} = require("../controllers/Auth")
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/resetPassword")

const { auth } = require("../middleware/auth")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Diagnostic status for SMTP configuration (safe, masks secrets)
router.get("/mail-status", (req, res) => {
  return res.json({
    success: true,
    mailHost: process.env.MAIL_HOST || "smtp.gmail.com",
    mailUserConfigured: !!process.env.MAIL_USER,
    mailUser: process.env.MAIL_USER ? process.env.MAIL_USER.replace(/(.{3})(.*)(@.*)/, "$1***$3") : "not set",
    mailPassConfigured: !!process.env.MAIL_PASS,
    mailPassLength: process.env.MAIL_PASS ? process.env.MAIL_PASS.replace(/\s+/g, "").length : 0,
  })
})

// Route for Changing the password
router.post("/changepassword", auth, changePassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router
