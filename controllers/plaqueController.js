const fs = require('fs');
const path = require('path');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

function getPlaques(req, res) {
    connection.query('SELECT * FROM Plaque', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las placas');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_plaque: row.img_plaque ? path.basename(row.img_plaque) : null
        })));
    });
}

function getPlaquesById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Plaque WHERE id_plaque = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la placa');
            return;
        }
        res.json(rows[0]);
    });
}

function insertPlaque(req, res) {
    const { tipo_plaque, precio_plaque, descrip_plaque, contact_plaque, tel_plaque } = req.body;
    const img_plaque = req.file ? req.file.path : null;
    
    connection.query(
        'INSERT INTO Plaque (tipo_plaque, precio_plaque, descrip_plaque, contact_plaque, tel_plaque, img_plaque) VALUES (?, ?, ?, ?, ?, ?)',
        [tipo_plaque, precio_plaque, descrip_plaque, contact_plaque, tel_plaque, img_plaque],
        function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar la placa');
                return;
            }
            res.send({ id: results.insertId, message: 'Placa insertada exitosamente' });
        }
    );
}

function deletePlaque(req, res) {
    const { id } = req.params;

    // Primero, obtén la ruta de la imagen que se eliminará
    connection.query('SELECT img_plaque FROM Plaque WHERE id_plaque = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen de la placa');
            return;
        }

        const imgPath = rows[0]?.img_plaque;

        // Elimina el registro de la base de datos
        connection.query('DELETE FROM Plaque WHERE id_plaque = ?', [id], function(err) {
            if (err) {
                res.status(500).send('Error al eliminar la placa');
                return;
            }

            // Elimina el archivo de imagen del sistema de archivos si existe
            if (imgPath) {
                fs.unlink(imgPath, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                        res.status(500).send('Error al eliminar el archivo de imagen');
                    } else {
                        res.send({ message: 'Placa eliminada exitosamente' });
                    }
                });
            } else {
                res.send({ message: 'Placa eliminada exitosamente' });
            }
        });
    });
}

function updatePlaque(req, res) {
    const { id } = req.params;
    const { tipo_plaque, precio_plaque, descrip_plaque, contact_plaque, tel_plaque } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    connection.query('SELECT img_plaque FROM Plaque WHERE id_plaque = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen de la placa');
            return;
        }

        const oldImagePath = rows[0]?.img_plaque;

        // Si se proporciona una nueva imagen, elimina la imagen anterior
        if (newImagePath && oldImagePath && oldImagePath !== newImagePath) {
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo de imagen:', err);
                    res.status(500).send('Error al eliminar el archivo de imagen');
                }
            });
        }

        // Si no se proporciona una nueva imagen, mantenemos la imagen actual
        if (!newImagePath && oldImagePath) {
            newImagePath = oldImagePath;
        }

        // Luego, actualiza el registro
        connection.query(
            'UPDATE Plaque SET tipo_plaque = ?, precio_plaque = ?, descrip_plaque = ?, contact_plaque = ?, tel_plaque = ?, img_plaque = ? WHERE id_plaque = ?',
            [tipo_plaque, precio_plaque, descrip_plaque, contact_plaque, tel_plaque, newImagePath, id],
            function(err) {
                if (err) {
                    res.status(500).send('Error al actualizar la placa');
                    return;
                }
                res.send({ message: 'Placa actualizada exitosamente' });
            }
        );
    });
}

module.exports = { getPlaques, insertPlaque, deletePlaque, updatePlaque, getPlaquesById };
