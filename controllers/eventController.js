const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")

function getEvents(req, res) {
    db.all('SELECT * FROM Evento', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los eventos');
            return;
        }
        res.json(rows);
    });
}

function getEventsById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Evento WHERE id_event = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener eventos ');
            return;
        }
        res.json(row);
    });
}



function insertEvent(req, res) {
    const { nombre_event, tipo_event, fecha_event, cli_event, lugar_event } = req.body;
    db.run(`INSERT INTO Evento (nombre_event, tipo_event, fecha_event, cli_event, lugar_event) VALUES (?, ?, ?, ?, ?)`,
        [nombre_event, tipo_event, fecha_event, cli_event, lugar_event], function(err) {
            if (err) {
                res.status(500).send('Error al insertar el evento');
                return;
            }
            res.send({ id: this.lastID, message: 'Evento insertado exitosamente' });
        });
}

function deleteEvent(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Evento WHERE id_event = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el evento');
            return;
        }
        res.send({ message: 'Evento eliminado exitosamente' });
    });
}

function updateEvent(req, res) {
    const { id } = req.params;
    const { nombre_event, tipo_event, fecha_event, cli_event, lugar_event } = req.body;
    db.run(`UPDATE Evento SET nombre_event = ?, tipo_event = ?, fecha_event = ?, cli_event = ?, lugar_event = ? WHERE id_event = ?`,
        [nombre_event, tipo_event, fecha_event, cli_event, lugar_event, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el evento');
                return;
            }
            res.send({ message: 'Evento actualizado exitosamente' });
        });
}

module.exports = { getEvents, insertEvent, deleteEvent, updateEvent,getEventsById };
