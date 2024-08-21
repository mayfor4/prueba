const nodemailer = require('nodemailer');

// Configura el transportador de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'diegoorios97@gmail.com', // Reemplaza con tu correo electrónico
        pass: 'dejt ofdx zybh vrgr' // Reemplaza con tu contraseña de correo electrónico
    },
    tls: {
        rejectUnauthorized: false
    }
});

function sendMail(to, subject, text, attachments = []) {
    const mailOptions = {
        from: 'diegoorios97@gmail.com',
        to:'diegoorios97@gmail.com',
        subject,
        text,
        attachments
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
