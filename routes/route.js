const express = require('express');
const router = express.Router();
const { generarPDF } = require('../controllers/pdfController');
const { sendMail } = require('../controllers/mailController');
const bodyParser = require('body-parser');

// Middleware para analizar datos del formulario
router.use(bodyParser.urlencoded({ extended: true })); 
router.use(bodyParser.json());

router.post('/api/generar-pdf', (req, res) => {
    const data = req.body;

    generarPDF(data, (err, pdfPath) => {
        if (err) {
            return res.status(500).json({ message: 'Error al generar el PDF' });
        }

        sendMail('eventostaven@gmail.com', 'Nueva Solicitud de Cotización', `Nueva solicitud de cotización de ${data.nomcliente}.`, [
            {
                filename: 'cotizacion.pdf',
                path: pdfPath
            }
        ])
        .then(() => {
            res.json({ message: 'Correo enviado exitosamente' });
        })
        .catch(mailErr => {
            res.status(500).json({ message: 'Error al enviar el correo electrónico' });
        });
    });
});

module.exports = router;
