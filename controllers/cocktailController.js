const mysql = require('mysql');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

// Obtiene todos los cócteles
function getCocktails(req, res) {
    connection.query('SELECT * FROM Cocteleria', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los cócteles');
            return;
        }
        res.json(rows);
    });
}

// Obtiene un cóctel por ID
function getCocktailsById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Cocteleria WHERE id_coctel = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener el cóctel');
            return;
        }
        res.json(rows[0]);
    });
}

// Inserta un nuevo cóctel
function insertCocktail(req, res) {
    const { tipo_coctel, descrip_coctel, precio_coctel, contact_coctel, tel_coctel } = req.body;

    connection.query('INSERT INTO Cocteleria (tipo_coctel, descrip_coctel, precio_coctel, contact_coctel, tel_coctel) VALUES (?, ?, ?, ?, ?)',
        [tipo_coctel, descrip_coctel, precio_coctel, contact_coctel, tel_coctel], function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar el cóctel');
                return;
            }
            res.send({ id: results.insertId, message: 'Cóctel insertado exitosamente' });
        });
}

// Elimina un cóctel por ID
function deleteCocktail(req, res) {
    const { id } = req.params;
    connection.query('DELETE FROM Cocteleria WHERE id_coctel = ?', [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el cóctel');
            return;
        }
        res.send({ message: 'Cóctel eliminado exitosamente' });
    });
}

// Actualiza un cóctel por ID
function updateCocktail(req, res) {
    const { id } = req.params;
    const { tipo_coctel, descrip_coctel, precio_coctel, contact_coctel, tel_coctel } = req.body;

    connection.query('UPDATE Cocteleria SET tipo_coctel = ?, descrip_coctel = ?, precio_coctel = ?, contact_coctel = ?, tel_coctel = ? WHERE id_coctel = ?',
        [tipo_coctel, descrip_coctel, precio_coctel, contact_coctel, tel_coctel, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el cóctel');
                return;
            }
            res.send({ message: 'Cóctel actualizado exitosamente' });
        });
}

module.exports = { getCocktails, insertCocktail, deleteCocktail, updateCocktail, getCocktailsById };
