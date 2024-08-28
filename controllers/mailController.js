const nodemailer = require('nodemailer');

// Configura el transportador de correo
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'taveneventos@gmail.com', // Reemplaza con tu correo electrónico
        pass: 'bhzn nqbi crci fnbw' // Reemplaza con tu contraseña de correo electrónico
    },
    tls: {
        rejectUnauthorized: false
    }
});

function sendMail(to, subject, text, attachments = []) {
    const mailOptions = {
        from: 'eventostaven@gmail.com',
        to:'eventostaven@gmail.com',
        subject,
        text,
        attachments
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
