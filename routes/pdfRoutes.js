const express = require('express');
const { generarPDF } = require('../controllers/pdfController');

const router = express.Router();

router.post('/generar', (req, res) => {
  const { tipoEvento, clienteId } = req.body;
  generarPDF(tipoEvento, clienteId, res);
});

module.exports = router;
