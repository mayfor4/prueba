// centerpieceController.js
const fs = require('fs');
const path = require('path');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

function getCenterpieces(req, res) {
    connection.query('SELECT * FROM Centro_Mesa', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los centros de mesa');
            return;
        }

        res.json(rows.map(row => ({
            ...row,
            img_cm: row.img_cm ? path.basename(row.img_cm.toString()) : null // Convierte a cadena si es Buffer
        })));
    });
}





function getCenterpiecesById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Centro_Mesa WHERE id_cm = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener centros de mesa');
            return;
        }
        res.json(rows[0]);
    });
}

function insertCenterpiece(req, res) {
    const { tipo_cm, precio_cm, descrip_cm, contact_cm, tel_cm } = req.body;
    const img_cm = req.file ? req.file.path : null; // Cambiar a almacenar la ruta de la imagen

    connection.query(`INSERT INTO Centro_Mesa (tipo_cm, precio_cm, descrip_cm, contact_cm, tel_cm, img_cm) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_cm, precio_cm, descrip_cm, contact_cm, tel_cm, img_cm], function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar el centro de mesa');
                return;
            }
            res.send({ id: results.insertId, message: 'Centro de mesa insertado exitosamente' });
        });
}


function deleteCenterpiece(req, res) {
    const { id } = req.params;
    
    // Primero, obtén la ruta de la imagen que se eliminará
    connection.query('SELECT img_cm FROM Centro_Mesa WHERE id_cm = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen del centro de mesa');
            return;
        }

        const imgPath = rows[0]?.img_cm;

        // Elimina el registro de la base de datos
        connection.query('DELETE FROM Centro_Mesa WHERE id_cm = ?', [id], (err) => {
            if (err) {
                res.status(500).send('Error al eliminar el centro de mesa');
                return;
            }
            
            // Elimina el archivo de imagen del sistema de archivos si existe
            if (imgPath) {
                fs.unlink(imgPath, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                        res.status(500).send('Error al eliminar el archivo de imagen');
                    } else {
                        res.send({ message: 'Centro de mesa eliminado exitosamente' });
                    }
                });
            } else {
                res.send({ message: 'Centro de mesa eliminado exitosamente' });
            }
        });
    });
}

function updateCenterpiece(req, res) {
    const { id } = req.params;
    const { tipo_cm, precio_cm, descrip_cm, contact_cm, tel_cm } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    connection.query('SELECT img_cm FROM Centro_Mesa WHERE id_cm = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen del centro de mesa');
            return;
        }
        
        const oldImagePath = rows[0]?.img_cm;

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
        connection.query('UPDATE Centro_Mesa SET tipo_cm = ?, precio_cm = ?, descrip_cm = ?, contact_cm = ?, tel_cm = ?, img_cm = ? WHERE id_cm = ?',
            [tipo_cm, precio_cm, descrip_cm, contact_cm, tel_cm, newImagePath, id], function(err) {
                if (err) {
                    res.status(500).send('Error al actualizar el centro de mesa');
                    return;
                }
                res.send({ message: 'Centro de mesa actualizado exitosamente' });
            });
    });
}

module.exports = { getCenterpieces, insertCenterpiece, deleteCenterpiece, updateCenterpiece, getCenterpiecesById };
