const express = require("express");
const cors = require("cors"); 
const { sendOtp, verifyOtp } = require("../auth/controller");
const router = express.Router();

router.use(cors());

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp); 

module.exports = router;
