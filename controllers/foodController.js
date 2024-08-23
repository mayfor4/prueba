const mysql = require('mysql');
const connection = require('./mysqlConnection'); // Asegúrate de tener el archivo mysqlConnection.js

// Función para obtener todos los alimentos
function getFoods(req, res) {
    connection.query('SELECT * FROM Comida', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las comidas');
            return;
        }
        res.json(rows);
    });
}

// Función para obtener un alimento por su ID
function getFoodsById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Comida WHERE id_comida = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la comida');
            return;
        }
        res.json(rows[0]); // rows[0] porque MySQL devuelve un array de resultados
    });
}

// Función para insertar un nuevo alimento
function insertFood(req, res) {
    const { tipo_comida, desc_comida, contacto_comida } = req.body;
    const query = `INSERT INTO Comida (tipo_comida, desc_comida, contacto_comida) 
                   VALUES (?, ?, ?)`;
    connection.query(query, [tipo_comida, desc_comida, contacto_comida], (err, result) => {
        if (err) {
            res.status(500).send('Error al insertar la comida');
            return;
        }
        res.send({ id: result.insertId, message: 'Comida insertada exitosamente' });
    });
}

// Función para eliminar un alimento por su ID
function deleteFood(req, res) {
    const { id } = req.params;
    connection.query('DELETE FROM Comida WHERE id_comida = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send('Error al eliminar la comida');
            return;
        }
        res.send({ message: 'Comida eliminada exitosamente' });
    });
}

// Función para actualizar un alimento
function updateFood(req, res) {
    const { id } = req.params;
    const { tipo_comida, desc_comida, contacto_comida } = req.body;
    const query = `UPDATE Comida 
                   SET tipo_comida = ?, desc_comida = ?, contacto_comida = ? 
                   WHERE id_comida = ?`;
    connection.query(query, [tipo_comida, desc_comida, contacto_comida, id], (err, result) => {
        if (err) {
            res.status(500).send('Error al actualizar la comida');
            return;
        }
        res.send({ message: 'Comida actualizada exitosamente' });
    });
}

module.exports = { getFoods, insertFood, deleteFood, updateFood, getFoodsById };
