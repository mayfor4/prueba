const mysql = require('mysql');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

function getServices(req, res) {
    connection.query('SELECT * FROM Servicios', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los servicios');
            return;
        }
        res.json(rows);
    });
}

function getServicesById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Servicios WHERE id_service = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener el servicio');
            return;
        }
        res.json(rows[0]);
    });
}

function insertService(req, res) {
    const { tipo_service, descrip_service, precio_service, contact_service, tel_service } = req.body;
    connection.query(
        'INSERT INTO Servicios (tipo_service, descrip_service, precio_service, contact_service, tel_service) VALUES (?, ?, ?, ?, ?)',
        [tipo_service, descrip_service, precio_service, contact_service, tel_service],
        function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar el servicio');
                return;
            }
            res.send({ id: results.insertId, message: 'Servicio insertado exitosamente' });
        }
    );
}

function deleteService(req, res) {
    const { id } = req.params;
    connection.query('DELETE FROM Servicios WHERE id_service = ?', [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el servicio');
            return;
        }
        res.send({ message: 'Servicio eliminado exitosamente' });
    });
}

function updateService(req, res) {
    const { id } = req.params;
    const { tipo_service, descrip_service, precio_service, contact_service, tel_service } = req.body;
    connection.query(
        'UPDATE Servicios SET tipo_service = ?, descrip_service = ?, precio_service = ?, contact_service = ?, tel_service = ? WHERE id_service = ?',
        [tipo_service, descrip_service, precio_service, contact_service, tel_service, id],
        function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el servicio');
                return;
            }
            res.send({ message: 'Servicio actualizado exitosamente' });
        }
    );
}

module.exports = { getServices, insertService, deleteService, updateService, getServicesById };
