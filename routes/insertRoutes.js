const express = require('express');
const { insertRecord } = require('../controllers/insertController');
const { generarPDF } = require('../controllers/pdfController');

const router = express.Router();

// Ruta para insertar cliente
router.post('/cliente', (req, res) => {
  const { nombreCliente, telefonoCliente, correoCliente } = req.body;
  insertRecord('cliente', ['nom_cli', 'tel_cli', 'correo_cli'], [nombreCliente, telefonoCliente, correoCliente], (err) => {
    if (err) {
      res.status(500).send('Error al agregar el cliente');
      return;
    }
    res.send('Cliente agregado exitosamente');
  });
});

// Ruta para insertar evento
router.post('/evento', (req, res) => {
  const { tipoEvento, fechaEvento, numAdultos, numNinos, clienteId } = req.body;
  insertRecord('evento', ['tipo_event', 'date', 'adultos', 'niños', 'id_cli1'], [tipoEvento, fechaEvento, numAdultos, numNinos, clienteId], (err) => {
    if (err) {
      res.status(500).send('Error al agregar el evento');
      return;
    }
    res.send('Evento agregado exitosamente');
    generarPDF(tipoEvento, clienteId, res);
  });
});

// Ruta para agregar una nueva opción de evento
router.post('/agregar-opcion', (req, res) => {
  const nuevaOpcion = req.body.nuevaOpcion;

  if (nuevaOpcion && nuevaOpcion.trim() !== "") {
    insertRecord('evento', ['tipo_event'], [nuevaOpcion], (err) => {
      if (err) {
        res.status(500).send('Error al agregar la nueva opción a la base de datos');
        return;
      }
      res.status(200).send('Opción agregada exitosamente');
    });
  } else {
    res.status(400).send('No se proporcionó una nueva opción válida');
  }
});


module.exports = router;
