
const express = require('express');
const { deleteRecord } = require('../controllers/deleteController');

const router = express.Router();

// Ruta para eliminar cliente
router.delete('/cliente/:id', (req, res) => {
  const { id } = req.params;
  deleteRecord('cliente', 'id_cli', id, (err) => {
    if (err) {
      res.status(500).send('Error al eliminar el cliente');
      return;
    }
    res.send('Cliente eliminado exitosamente');
  });
});

// Ruta para eliminar evento
router.delete('/evento/:id', (req, res) => {
  const { id } = req.params;
  deleteRecord('evento', 'id_evento', id, (err) => {
    if (err) {
      res.status(500).send('Error al eliminar el evento');
      return;
    }
    res.send('Evento eliminado exitosamente');
  });
});

module.exports = router;