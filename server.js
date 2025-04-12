const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // for sending the verification request
const app = express();

const SECRET_KEY = '6Le0kxUrAAAAAOsx4WqUFfurOJlXoQvOR0rv1F13'; // <-- Replace with your real secret key from reCAPTCHA

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serves your signin.html, etc.

app.post('/verify', async (req, res) => {
  const token = req.body['g-recaptcha-response'];
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`;

  try {
    const response = await axios.post(verifyURL);
    const success = response.data.success;

    if (success) {
      res.send("✅ CAPTCHA verified! You’re good to go.");
    } else {
      // 🛑 Graceful error handling
      const errorCodes = response.data['error-codes'] || [];
      res.send(`❌ CAPTCHA failed. Reasons: ${errorCodes.join(', ') || 'Unknown error'}`);
    }
  } catch (error) {
    // 🛑 Graceful handling of technical errors (like network issues)
    res.status(500).send("⚠️ Server error while verifying CAPTCHA. Please try again later.");
  }
});

