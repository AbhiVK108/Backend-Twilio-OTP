const twilio = require('twilio');
const env = require('dotenv');
env.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const otpStore = {};  

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); 
};
module.exports = { generateOTP };

// send otp
const sendOtp = (req, res) => {
    const { phoneNumber } = req.body;
    const otp = generateOTP(); 

    console.log(`Sending OTP to: ${phoneNumber}`);

    otpStore[phoneNumber] = otp; 

    client.messages
        .create({
            body: `Your OTP code is ${otp}`, 
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber, 
        })
        .then(message => res.json({ success: true, message: 'OTP sent successfully', sid: message.sid }))
        .catch(err => res.status(500).json({ success: false, message: 'Failed to send OTP', error: err.message }));
};

// verify otp
const verifyOtp = (req, res) => {
    const { phoneNumber, otp } = req.body;

    if (otpStore[phoneNumber] && otpStore[phoneNumber] === otp) {
        delete otpStore[phoneNumber]; 
        return res.json({ success: true, message: 'OTP verified successfully' });
    } else {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
};

module.exports = { sendOtp, verifyOtp }; 
