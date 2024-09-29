
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sudarshanbhalse1997@gmail.com',
        pass: 'wcatzoufosxfpvrh',
    },
});

module.exports.sendMail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: 'mahesh@haripriyagrp.com',
            to,
            subject,
            text,
        });

        console.log('Email sent successfully');

    } catch (error) {

        console.error('Error sending email:', error);
    }
};
