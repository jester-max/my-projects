const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sudarshanbhalse1997@gmail.com',
    pass: 'wcatzoufosxfpvrh',
  },
});

console.log(path.join(__dirname, '../../views', `sale.ejs`), 'hello');

module.exports.sendMail = async (to, subject, text) => {
  try {
    const htmlContent = await ejs.renderFile(
      path.join(__dirname, '../../views', `token.ejs`),
        {text, }
    );

    await transporter.sendMail({
      from: 'mahesh@haripriyagrp.com',
      to,
      subject,
      html: htmlContent,
      attachments:``
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
