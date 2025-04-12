const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // for sending the verification request
const app = express();

const SECRET_KEY = '6Le0kxUrAAAAAOsx4WqUFfurOJlXoQvOR0rv1F13'; // <-- Replace with your real secret key from reCAPTCHA

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serves your signin.html, etc.

app.post('/verify', async (req, res) => {
  const token = req.body['g-recaptcha-response'];

  // 🚫 Block empty responses
  if (!token) {
    return res.send("⚠️ Please complete the CAPTCHA.");
  }

  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`;

  try {
    const response = await axios.post(verifyURL);
    const success = response.data.success;

    if (success) {
      res.send("✅ CAPTCHA verified! You’re good to go.");
    } else {
      const errorCodes = response.data['error-codes'] || [];
      res.send(`❌ CAPTCHA failed. Reason: ${errorCodes.join(', ')}`);
    }
  } catch (error) {
    res.status(500).send("⚠️ Server error while verifying CAPTCHA. Try again.");
  }
});
