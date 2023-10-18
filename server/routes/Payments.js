// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature,sendPaymentSuccessEmail } = require("../controllers/Payment")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
router.post("/capturePayment", auth, capturePayment)
router.post("/verifySignature",auth, verifySignature)
router.post("/sendPaymentSuccessEmail",auth, sendPaymentSuccessEmail)

module.exports = router