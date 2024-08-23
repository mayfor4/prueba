const mysql = require('mysql');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

// Obtiene todos los postres
function getDesserts(req, res) {
    connection.query('SELECT * FROM Postres', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los postres');
            return;
        }
        res.json(rows);
    });
}

// Obtiene un postre por ID
function getDessertsById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Postres WHERE id_postre = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener el postre');
            return;
        }
        res.json(rows[0]);
    });
}

// Inserta un nuevo postre
function insertDessert(req, res) {
    const { tipo_postre, descrip_postre, precio_postre, contact_postre, tel_postre } = req.body;
    connection.query('INSERT INTO Postres (tipo_postre, descrip_postre, precio_postre, contact_postre, tel_postre) VALUES (?, ?, ?, ?, ?)',
        [tipo_postre, descrip_postre, precio_postre, contact_postre, tel_postre], function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar el postre');
                return;
            }
            res.send({ id: results.insertId, message: 'Postre insertado exitosamente' });
        });
}

// Elimina un postre por ID
function deleteDessert(req, res) {
    const { id } = req.params;
    connection.query('DELETE FROM Postres WHERE id_postre = ?', [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el postre');
            return;
        }
        res.send({ message: 'Postre eliminado exitosamente' });
    });
}

// Actualiza un postre por ID
function updateDessert(req, res) {
    const { id } = req.params;
    const { tipo_postre, descrip_postre, precio_postre, contact_postre, tel_postre } = req.body;
    connection.query('UPDATE Postres SET tipo_postre = ?, descrip_postre = ?, precio_postre = ?, contact_postre = ?, tel_postre = ? WHERE id_postre = ?',
        [tipo_postre, descrip_postre, precio_postre, contact_postre, tel_postre, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el postre');
                return;
            }
            res.send({ message: 'Postre actualizado exitosamente' });
        });
}

module.exports = { getDesserts, insertDessert, deleteDessert, updateDessert, getDessertsById };
