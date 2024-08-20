const express = require('express');
const { updateRecord } = require('../controllers/updateController');

const router = express.Router();
// Ruta para actualizar cliente
router.put('/cliente/:id', (req, res) => {
  const { id } = req.params;
  const { nombreCliente, telefonoCliente, correoCliente } = req.body;
  updateRecord('cliente', ['nom_cli', 'tel_cli', 'correo_cli'], [nombreCliente, telefonoCliente, correoCliente], 'id_cli', id, (err) => {
    if (err) {
      res.status(500).send('Error al actualizar el cliente');
      return;
    }
    res.send('Cliente actualizado exitosamente');
  });
});


// Ruta para actualizar evento
router.put('/evento/:id', (req, res) => {
  const { id } = req.params;
  const { tipoEvento, fechaEvento, numAdultos, numNinos, clienteId } = req.body;
  updateRecord('evento', ['tipo_event', 'date', 'adultos', 'niños', 'id_cli1'], [tipoEvento, fechaEvento, numAdultos, numNinos, clienteId], 'id_evento', id, (err) => {
    if (err) {
      res.status(500).send('Error al actualizar el evento');
      return;
    }
    res.send('Evento actualizado exitosamente');
  });
});

// Ruta para guardar los detalles del evento
router.post('/guardar-detalles', (req, res) => {
  const { tipoEvento, fechaEvento, numAdultos, numNinos } = req.body;

  updateRecord('evento', ['date', 'adultos', 'niños'], [fechaEvento, numAdultos, numNinos], 'tipo_event', tipoEvento, (err) => {
    if (err) {
      res.status(500).send('Error al guardar los detalles del evento');
      return;
    }
    res.status(200).send('Detalles guardados exitosamente');
  });
});



module.exports = router;