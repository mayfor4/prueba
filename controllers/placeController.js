const mysql = require('mysql');
const path = require('path');
const fs = require('fs');


const connection = require('./mysqlConnection'); // Asegúrate de configurar la conexión MySQL

// Obtiene todos los lugares
function getPlaces(req, res) {
    connection.query('SELECT * FROM Lugar', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener los lugares');
            return;
        }
        res.json(results.map(row => ({
            ...row,
            img_lugar: row.img_lugar ? path.basename(row.img_lugar) : null
        })));
    });
}

// Obtiene un lugar por ID
function getPlacesById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Lugar WHERE id_lugar = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener el lugar');
            return;
        }
        res.json(results[0]);
    });
}

// Inserta un nuevo lugar
function insertPlace(req, res) {
    const { nombre_lugar, tipo_lugar, dir_lugar, zona_lugar, capacidad_lugar, contact_lugar, tel_lugar, adicional_lugar, condiciones_lugar, paq1_lugar, paq2_lugar, paq3_lugar, paq4_lugar, paq5_lugar, paq6_lugar } = req.body;
    const img_lugar = req.file ? req.file.path : null;

    connection.query('INSERT INTO Lugar (nombre_lugar, tipo_lugar, dir_lugar, zona_lugar, capacidad_lugar, contact_lugar, tel_lugar, adicional_lugar, condiciones_lugar, paq1_lugar, paq2_lugar, paq3_lugar, paq4_lugar, paq5_lugar, paq6_lugar, img_lugar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre_lugar, tipo_lugar, dir_lugar, zona_lugar, capacidad_lugar, contact_lugar, tel_lugar, adicional_lugar, condiciones_lugar, paq1_lugar, paq2_lugar, paq3_lugar, paq4_lugar, paq5_lugar, paq6_lugar, img_lugar], function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar el lugar');
                return;
            }
            res.send({ id: results.insertId, message: 'Lugar insertado exitosamente' });
        });
}

// Elimina un lugar por ID
function deletePlace(req, res) {
    const { id } = req.params;

    // Primero, obtén la ruta de la imagen que se eliminará
    connection.query('SELECT img_lugar FROM Lugar WHERE id_lugar = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen del lugar');
            return;
        }

        const row = results[0];

        // Elimina el registro de la base de datos
        connection.query('DELETE FROM Lugar WHERE id_lugar = ?', [id], function(err) {
            if (err) {
                res.status(500).send('Error al eliminar el lugar');
                return;
            }

            // Elimina el archivo de imagen del sistema de archivos si existe
            if (row.img_lugar) {
                fs.unlink(row.img_lugar, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                    }
                });
            }

            res.send({ message: 'Lugar eliminado exitosamente' });
        });
    });
}

// Actualiza un lugar por ID
function updatePlace(req, res) {
    const { id } = req.params;
    const { nombre_lugar, tipo_lugar, dir_lugar, zona_lugar, capacidad_lugar, contact_lugar, tel_lugar, adicional_lugar, condiciones_lugar, paq1_lugar, paq2_lugar, paq3_lugar, paq4_lugar, paq5_lugar, paq6_lugar } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    connection.query('SELECT img_lugar FROM Lugar WHERE id_lugar = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen del lugar');
            return;
        }

        const row = results[0];

        // Si se proporciona una nueva imagen, elimina la imagen anterior
        if (newImagePath && row.img_lugar && row.img_lugar !== newImagePath) {
            fs.unlink(row.img_lugar, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo de imagen:', err);
                }
            });
        }

        // Si no se proporciona una nueva imagen, mantenemos la imagen actual
        if (!newImagePath && row) {
            newImagePath = row.img_lugar;
        }

        // Luego, actualiza el registro
        connection.query('UPDATE Lugar SET nombre_lugar = ?, tipo_lugar = ?, dir_lugar = ?, zona_lugar = ?, capacidad_lugar = ?, contact_lugar = ?, tel_lugar = ?, adicional_lugar = ?, condiciones_lugar = ?, paq1_lugar = ?, paq2_lugar = ?, paq3_lugar = ?, paq4_lugar = ?, paq5_lugar = ?, paq6_lugar = ?, img_lugar = ? WHERE id_lugar = ?',
            [nombre_lugar, tipo_lugar, dir_lugar, zona_lugar, capacidad_lugar, contact_lugar, tel_lugar, adicional_lugar, condiciones_lugar, paq1_lugar, paq2_lugar, paq3_lugar, paq4_lugar, paq5_lugar, paq6_lugar, newImagePath, id], function(err) {
                if (err) {
                    res.status(500).send('Error al actualizar el lugar');
                    return;
                }
                res.send({ message: 'Lugar actualizado exitosamente' });
            });
    });
}

module.exports = { getPlaces, insertPlace, deletePlace, updatePlace, getPlacesById };
