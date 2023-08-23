const mongoose = require("mongoose");
const mailSender = require("../../../../server/utils/mailSender");

const OTPSchema = mongoose.Schema({
    email: {
        require: true,
        type: String
    },
    otp: {
        type: String,
        require: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60 //5min
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        const MessageResponds = await mailSender(email, "Verification Email By CourseWave", otp);
        console.log("Sucessfully sent otp:", MessageResponds);
    } catch (error) {
        console.log("error occures at sendVerificationEmail:", error.message);
        throw error;
    }
}

OTPSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);