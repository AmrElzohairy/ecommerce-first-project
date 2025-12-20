const nodemailer = require('nodemailer');

// Nodemailer
const sendEmail = async (options) => {
    // 1) Create transporter ( service that will send email like "gmail","Mailgun", "mialtrap", sendGrid)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GOOGLE_APP_Email,
            pass: process.env.GOOGLE_APP_PASSWORD, // The 16-character App Password
        },
    });

    // 2) Define email options (like from, to, subject, email content)
   const mailOpts = {
    from: 'E-shop App <aelzohairy9@gmail.com>',
    to: options.to,       
    subject: options.subject,
    text: options.text,    
  };

    // 3) Send email
    await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;