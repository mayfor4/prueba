const fs = require('fs');
const path = require('path');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

// Obtiene todas las decoraciones
function getDecorations(req, res) {
    connection.query('SELECT * FROM Decoracion', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las decoraciones');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_dec: row.img_dec ? path.basename(row.img_dec) : null
        })));
    });
}

// Obtiene una decoración por ID
function getDecorationsById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Decoracion WHERE id_dec = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la decoración');
            return;
        }
        res.json(rows[0]);
    });
}

// Inserta una nueva decoración
function insertDecoration(req, res) {
    const { tipo_dec, precio_dec, descrip_dec, contact_dec, tel_dec } = req.body;
    const img_dec = req.file ? req.file.path : null; // Cambia a almacenar la ruta de la imagen

    connection.query('INSERT INTO Decoracion (tipo_dec, precio_dec, descrip_dec, contact_dec, tel_dec, img_dec) VALUES (?, ?, ?, ?, ?, ?)',
        [tipo_dec, precio_dec, descrip_dec, contact_dec, tel_dec, img_dec], function(err, results) {
            if (err) {
                console.error('Error al insertar el extra:', err); // Log para depuración
                res.status(500).send('Error al insertar la decoración');
                return;
            }
            res.send({ id: results.insertId, message: 'Decoración insertada exitosamente' });
        });
}

// Elimina una decoración por ID
function deleteDecoration(req, res) {
    const { id } = req.params;

    // Primero, obtén la ruta de la imagen que se eliminará
    connection.query('SELECT img_dec FROM Decoracion WHERE id_dec = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen de la decoración');
            return;
        }

        const imgPath = rows[0]?.img_dec;

        // Elimina el registro de la base de datos
        connection.query('DELETE FROM Decoracion WHERE id_dec = ?', [id], function(err) {
            if (err) {
                res.status(500).send('Error al eliminar la decoración');
                return;
            }

            // Elimina el archivo de imagen del sistema de archivos si existe
            if (imgPath) {
                fs.unlink(imgPath, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                        res.status(500).send('Error al eliminar el archivo de imagen');
                    } else {
                        res.send({ message: 'Decoración eliminada exitosamente' });
                    }
                });
            } else {
                res.send({ message: 'Decoración eliminada exitosamente' });
            }
        });
    });
}

// Actualiza una decoración por ID
function updateDecoration(req, res) {
    const { id } = req.params;
    const { tipo_dec, precio_dec, descrip_dec, contact_dec, tel_dec } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    connection.query('SELECT img_dec FROM Decoracion WHERE id_dec = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen de la decoración');
            return;
        }

        const oldImagePath = rows[0]?.img_dec;

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
        connection.query('UPDATE Decoracion SET tipo_dec = ?, precio_dec = ?, descrip_dec = ?, contact_dec = ?, tel_dec = ?, img_dec = ? WHERE id_dec = ?',
            [tipo_dec, precio_dec, descrip_dec, contact_dec, tel_dec, newImagePath, id], function(err) {
                if (err) {
                    res.status(500).send('Error al actualizar la decoración');
                    return;
                }
                res.send({ message: 'Decoración actualizada exitosamente' });
            });
    });
}

module.exports = { getDecorations, insertDecoration, deleteDecoration, updateDecoration, getDecorationsById };
