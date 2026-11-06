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
		return mailResponse;
	} catch (error) {
		console.warn("Notice: Outbound SMTP failed (likely cloud host port restriction): ", error.message);
		// Allow OTP record creation so verification remains functional
		return null;
	}
}

// Define a pre-save hook to send email before document is saved
OTPSchema.pre("save", async function (next) {
	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;
