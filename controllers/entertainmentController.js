const mysql = require('mysql');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

// Obtiene todos los entretenimientos
function getEntertainment(req, res) {
    connection.query('SELECT * FROM Diversion', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la diversión');
            return;
        }
        res.json(rows);
    });
}

// Obtiene un entretenimiento por ID
function getEntertainmentById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Diversion WHERE id_diversion = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la diversión');
            return;
        }
        res.json(rows[0]);
    });
}

// Inserta un nuevo entretenimiento
function insertEntertainment(req, res) {
    const { tipo_diversion, descrip_diversion, precio_diversion, contact_diversion, tel_diversion } = req.body;
    connection.query('INSERT INTO Diversion (tipo_diversion, descrip_diversion, precio_diversion, contact_diversion, tel_diversion) VALUES (?, ?, ?, ?, ?)',
        [tipo_diversion, descrip_diversion, precio_diversion, contact_diversion, tel_diversion], function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar la diversión');
                return;
            }
            res.send({ id: results.insertId, message: 'Diversión insertada exitosamente' });
        });
}

// Elimina un entretenimiento por ID
function deleteEntertainment(req, res) {
    const { id } = req.params;
    connection.query('DELETE FROM Diversion WHERE id_diversion = ?', [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la diversión');
            return;
        }
        res.send({ message: 'Diversión eliminada exitosamente' });
    });
}

// Actualiza un entretenimiento por ID
function updateEntertainment(req, res) {
    const { id } = req.params;
    const { tipo_diversion, descrip_diversion, precio_diversion, contact_diversion, tel_diversion } = req.body;
    connection.query('UPDATE Diversion SET tipo_diversion = ?, descrip_diversion = ?, precio_diversion = ?, contact_diversion = ?, tel_diversion = ? WHERE id_diversion = ?',
        [tipo_diversion, descrip_diversion, precio_diversion, contact_diversion, tel_diversion, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la diversión');
                return;
            }
            res.send({ message: 'Diversión actualizada exitosamente' });
        });
}

module.exports = { getEntertainment, insertEntertainment, deleteEntertainment, updateEntertainment, getEntertainmentById };
