const connection = require('./mysqlConnection'); // Importa la conexión MySQL
const fs = require('fs');
const path = require('path');

function getDinnerware(req, res) {
    connection.query('SELECT * FROM Loza', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la loza');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_loza: row.img_loza ? path.basename(row.img_loza) : null
        })));
    });
}

function getDinnerwareById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Loza WHERE id_loza = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la loza');
            return;
        }
        res.json(rows[0]);
    });
}

function insertDinnerware(req, res) {
    const { tipo_loza, precio_loza, descrip_loza, contact_loza, tel_loza } = req.body;
    const img_loza = req.file ? req.file.path : null;

    connection.query(
        `INSERT INTO Loza (tipo_loza, precio_loza, descrip_loza, contact_loza, tel_loza, img_loza) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_loza, precio_loza, descrip_loza, contact_loza, tel_loza, img_loza],
        function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar la loza');
                return;
            }
            res.send({ id: results.insertId, message: 'Loza insertada exitosamente' });
        }
    );
}

function deleteDinnerware(req, res) {
    const { id } = req.params;

    // Primero, obtén la ruta de la imagen que se eliminará
    connection.query('SELECT img_loza FROM Loza WHERE id_loza = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send({ message: 'Error al obtener la imagen de la loza' });
            return;
        }

        const imgPath = rows[0].img_loza;

        // Elimina el registro de la base de datos
        connection.query('DELETE FROM Loza WHERE id_loza = ?', [id], function(err) {
            if (err) {
                res.status(500).send({ message: 'Error al eliminar la loza' });
                return;
            }

            // Elimina el archivo de imagen del sistema de archivos si existe
            if (imgPath) {
                fs.unlink(imgPath, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                        res.status(500).send({ message: 'Error al eliminar el archivo de imagen' });
                    } else {
                        res.send({ message: 'Loza eliminada exitosamente', success: 'La loza ha sido eliminada correctamente' });
                    }
                });
            } else {
                res.send({ message: 'Loza eliminada exitosamente', success: 'La loza ha sido eliminada correctamente' });
            }
        });
    });
}

function updateDinnerware(req, res) {
    const { id } = req.params;
    const { tipo_loza, precio_loza, descrip_loza, contact_loza, tel_loza } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    connection.query('SELECT img_loza FROM Loza WHERE id_loza = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send({ message: 'Error al obtener la imagen de la loza' });
            return;
        }

        const currentImagePath = rows[0].img_loza;

        // Si se proporciona una nueva imagen, elimina la imagen anterior
        if (newImagePath && currentImagePath && currentImagePath !== newImagePath) {
            fs.unlink(currentImagePath, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo de imagen:', err);
                    res.status(500).send({ message: 'Error al eliminar el archivo de imagen' });
                }
            });
        }

        // Si no se proporciona una nueva imagen, mantenemos la imagen actual
        if (!newImagePath) {
            newImagePath = currentImagePath;
        }

        // Luego, actualiza el registro
        connection.query(
            `UPDATE Loza SET tipo_loza = ?, precio_loza = ?, descrip_loza = ?, contact_loza = ?, tel_loza = ?, img_loza = ? WHERE id_loza = ?`,
            [tipo_loza, precio_loza, descrip_loza, contact_loza, tel_loza, newImagePath, id],
            function(err) {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar la loza' });
                    return;
                }
                res.send({ message: 'Loza actualizada exitosamente', success: 'La loza ha sido actualizada correctamente' });
            }
        );
    });
}

module.exports = { getDinnerware, insertDinnerware, deleteDinnerware, updateDinnerware, getDinnerwareById };
