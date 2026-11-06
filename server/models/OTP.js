const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		index: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(
			email,
			"StudyNotion - Verification Code",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse?.response || mailResponse);
	} catch (error) {
		console.error("Error occurred while sending verification email: ", error.message);
	}
}

// Define a pre-save hook to send email before document is saved asynchronously
OTPSchema.pre("save", function (next) {
	// Only send an email when a new document is created
	if (this.isNew) {
		sendVerificationEmail(this.email, this.otp).catch((err) => {
			console.error("Async email delivery error: ", err.message);
		});
	}
	next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
