const mysqlConnection = require('./mysqlConnection'); // Asegúrate de tener el archivo mysqlConnection.js

// Función para obtener todos los eventos
function getEvents(req, res) {
    mysqlConnection.query('SELECT * FROM Evento', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los eventos');
            return;
        }
        res.json(rows);
    });
}

// Función para obtener un evento por su ID
function getEventsById(req, res) {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM Evento WHERE id_event = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener el evento');
            return;
        }
        res.json(rows[0]); // rows[0] porque MySQL devuelve un array de resultados
    });
}

// Función para insertar un nuevo evento
function insertEvent(req, res) {
    const { nombre_event, tipo_event, fecha_event, cli_event, lugar_event } = req.body;
    const query = `INSERT INTO Evento (nombre_event, tipo_event, fecha_event, cli_event, lugar_event) 
                   VALUES (?, ?, ?, ?, ?)`;
    mysqlConnection.query(query, [nombre_event, tipo_event, fecha_event, cli_event, lugar_event], (err, result) => {
        if (err) {
            res.status(500).send('Error al insertar el evento');
            return;
        }
        res.send({ id: result.insertId, message: 'Evento insertado exitosamente' });
    });
}

// Función para eliminar un evento por su ID
function deleteEvent(req, res) {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM Evento WHERE id_event = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send('Error al eliminar el evento');
            return;
        }
        res.send({ message: 'Evento eliminado exitosamente' });
    });
}

// Función para actualizar un evento
function updateEvent(req, res) {
    const { id } = req.params;
    const { nombre_event, tipo_event, fecha_event, cli_event, lugar_event } = req.body;
    const query = `UPDATE Evento 
                   SET nombre_event = ?, tipo_event = ?, fecha_event = ?, cli_event = ?, lugar_event = ? 
                   WHERE id_event = ?`;
    mysqlConnection.query(query, [nombre_event, tipo_event, fecha_event, cli_event, lugar_event, id], (err, result) => {
        if (err) {
                  console.error('Error al insertar el extra:', err); // Log para depuración
            res.status(500).send('Error al actualizar el evento');
            return;
        }
        res.send({ message: 'Evento actualizado exitosamente' });
    });
}


module.exports = { getEvents, insertEvent, deleteEvent, updateEvent, getEventsById };