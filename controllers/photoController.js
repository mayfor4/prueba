const mysql = require('mysql');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

// Obtiene todas las fotos
function getPhotos(req, res) {
    connection.query('SELECT * FROM Fotos', (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener las fotos');
            return;
        }
        res.json(results);
    });
}

// Obtiene una foto por ID
function getPhotosById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Fotos WHERE id_foto = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener la foto');
            return;
        }
        res.json(results[0]);
    });
}

// Inserta una nueva foto
function insertPhoto(req, res) {
    const { tipo_foto, descrip_foto, precio_foto, contact_foto, tel_foto } = req.body;
    connection.query('INSERT INTO Fotos (tipo_foto, descrip_foto, precio_foto, contact_foto, tel_foto) VALUES (?, ?, ?, ?, ?)',
        [tipo_foto, descrip_foto, precio_foto, contact_foto, tel_foto], function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar la foto');
                return;
            }
            res.send({ id: results.insertId, message: 'Foto insertada exitosamente' });
        });
}

// Elimina una foto por ID
function deletePhoto(req, res) {
    const { id } = req.params;
    connection.query('DELETE FROM Fotos WHERE id_foto = ?', [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la foto');
            return;
        }
        res.send({ message: 'Foto eliminada exitosamente' });
    });
}

// Actualiza una foto por ID
function updatePhoto(req, res) {
    const { id } = req.params;
    const { tipo_foto, descrip_foto, precio_foto, contact_foto, tel_foto } = req.body;
    connection.query('UPDATE Fotos SET tipo_foto = ?, descrip_foto = ?, precio_foto = ?, contact_foto = ?, tel_foto = ? WHERE id_foto = ?',
        [tipo_foto, descrip_foto, precio_foto, contact_foto, tel_foto, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la foto');
                return;
            }
            res.send({ message: 'Foto actualizada exitosamente' });
        });
}

module.exports = { getPhotos, insertPhoto, deletePhoto, updatePhoto, getPhotosById };
