const nodemailer = require('nodemailer');

/**
 * Sends an email via SMTP when SMTP_* env vars are configured.
 * Returns true if the email was sent, false if SMTP is not configured
 * (callers can then fall back to returning the link directly — useful in dev).
 */
const sendEmail = async ({ to, subject, html, text }) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return false;
  }

  const port = Number(SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  await transporter.sendMail({
    from: SMTP_FROM || SMTP_USER,
    to,
    subject,
    text,
    html
  });

  return true;
};

module.exports = sendEmail;
