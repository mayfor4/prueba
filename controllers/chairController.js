const fs = require('fs');
const path = require('path');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

// Obtiene todas las sillas
function getChairs(req, res) {
    connection.query('SELECT * FROM Sillas', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las sillas');
            return;
        }

        res.json(rows.map(row => ({
            ...row,
            img_silla: row.img_silla ? path.basename(row.img_silla.toString()) : null // Convierte a cadena si es Buffer
        })));
    });
}

// Obtiene una silla por ID
function getChairsById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Sillas WHERE id_silla = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la silla');
            return;
        }
        res.json(rows[0]);
    });
}

// Inserta una nueva silla
function insertChair(req, res) {
    const { tipo_silla, precio_silla, descrip_silla, contact_silla, tel_silla } = req.body;
    const img_silla = req.file ? req.file.path : null; // Cambiar a almacenar la ruta de la imagen

    connection.query('INSERT INTO Sillas (tipo_silla, precio_silla, descrip_silla, contact_silla, tel_silla, img_silla) VALUES (?, ?, ?, ?, ?, ?)',
        [tipo_silla, precio_silla, descrip_silla, contact_silla, tel_silla, img_silla], function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar la silla');
                return;
            }
            res.send({ id: results.insertId, message: 'Silla insertada exitosamente' });
        });
}

// Elimina una silla por ID
function deleteChair(req, res) {
    const { id } = req.params;
    
    // Primero, obtén la ruta de la imagen que se eliminará
    connection.query('SELECT img_silla FROM Sillas WHERE id_silla = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen de la silla');
            return;
        }

        const imgPath = rows[0]?.img_silla;

        // Elimina el registro de la base de datos
        connection.query('DELETE FROM Sillas WHERE id_silla = ?', [id], (err) => {
            if (err) {
                res.status(500).send('Error al eliminar la silla');
                return;
            }
            
            // Elimina el archivo de imagen del sistema de archivos si existe
            if (imgPath) {
                fs.unlink(imgPath, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                        res.status(500).send('Error al eliminar el archivo de imagen');
                    } else {
                        res.send({ message: 'Silla eliminada exitosamente' });
                    }
                });
            } else {
                res.send({ message: 'Silla eliminada exitosamente' });
            }
        });
    });
}

// Actualiza una silla por ID
function updateChair(req, res) {
    const { id } = req.params;
    const { tipo_silla, precio_silla, descrip_silla, contact_silla, tel_silla } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    connection.query('SELECT img_silla FROM Sillas WHERE id_silla = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen de la silla');
            return;
        }
        
        const oldImagePath = rows[0]?.img_silla;

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
        connection.query('UPDATE Sillas SET tipo_silla = ?, precio_silla = ?, descrip_silla = ?, contact_silla = ?, tel_silla = ?, img_silla = ? WHERE id_silla = ?',
            [tipo_silla, precio_silla, descrip_silla, contact_silla, tel_silla, newImagePath, id], function(err) {
                if (err) {
                    res.status(500).send('Error al actualizar la silla');
                    return;
                }
                res.send({ message: 'Silla actualizada exitosamente' });
            });
    });
}

module.exports = { getChairs, insertChair, deleteChair, updateChair, getChairsById };
