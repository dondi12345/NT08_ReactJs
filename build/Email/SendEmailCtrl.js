"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create a transporter object using SMTP transport
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com', // Your Gmail email address
        pass: 'your_password' // Your Gmail password or an app password
    }
});
// Define the email options
const mailOptions = {
    from: 'your_email@gmail.com', // Sender address
    to: 'recipient_email@example.com', // List of recipients
    subject: 'Test Email', // Subject line
    text: 'This is a test email sent from Node.js using Gmail.' // Plain text body
    // You can also use `html` property for HTML formatted email
};
// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error occurred:', error.message);
    }
    else {
        console.log('Email sent:', info.response);
    }
});
