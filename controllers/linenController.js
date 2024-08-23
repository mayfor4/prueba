const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

// Obtiene todos los manteles
function getLinens(req, res) {
    connection.query('SELECT * FROM Manteleria', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los manteles');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_mantel: row.img_mantel ? path.basename(row.img_mantel) : null
        })));
    });
}

// Obtiene un mantel por ID
function getLinensById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Manteleria WHERE id_mantel = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener el mantel');
            return;
        }
        res.json(rows[0]);
    });
}

// Inserta un nuevo mantel
function insertLinen(req, res) {
    const { tipo_mantel, precio_mantel, descrip_mantel, contact_mantel, tel_mantel } = req.body;
    const img_mantel = req.file ? req.file.path : null;
    connection.query(`INSERT INTO Manteleria (tipo_mantel, precio_mantel, descrip_mantel, contact_mantel, tel_mantel, img_mantel) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_mantel, precio_mantel, descrip_mantel, contact_mantel, tel_mantel, img_mantel], function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar el mantel');
                return;
            }
            res.send({ id: results.insertId, message: 'Mantel insertado exitosamente' });
        });
}

// Elimina un mantel por ID
function deleteLinen(req, res) {
    const { id } = req.params;
    
    // Primero, obtén la ruta de la imagen que se eliminará
    connection.query('SELECT img_mantel FROM Manteleria WHERE id_mantel = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen del mantel');
            return;
        }
        
        const img_mantel = rows[0]?.img_mantel;

        // Elimina el registro de la base de datos
        connection.query('DELETE FROM Manteleria WHERE id_mantel = ?', [id], function(err) {
            if (err) {
                res.status(500).send('Error al eliminar el mantel');
                return;
            }
            
            // Elimina el archivo de imagen del sistema de archivos si existe
            if (img_mantel) {
                fs.unlink(img_mantel, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                        res.status(500).send('Error al eliminar el archivo de imagen');
                    } else {
                        res.send({ message: 'Mantel eliminado exitosamente' });
                    }
                });
            } else {
                res.send({ message: 'Mantel eliminado exitosamente' });
            }
        });
    });
}

// Actualiza un mantel por ID
function updateLinen(req, res) {
    const { id } = req.params;
    const { tipo_mantel, precio_mantel, descrip_mantel, contact_mantel, tel_mantel } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    connection.query('SELECT img_mantel FROM Manteleria WHERE id_mantel = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen del mantel');
            return;
        }
        
        const currentImagePath = rows[0]?.img_mantel;

        // Si se proporciona una nueva imagen, elimina la imagen anterior
        if (newImagePath && currentImagePath && currentImagePath !== newImagePath) {
            fs.unlink(currentImagePath, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo de imagen:', err);
                    res.status(500).send('Error al eliminar el archivo de imagen');
                    return;
                }
            });
        }
        
        // Si no se proporciona una nueva imagen, mantenemos la imagen actual
        if (!newImagePath && currentImagePath) {
            newImagePath = currentImagePath;
        }

        // Luego, actualiza el registro
        connection.query('UPDATE Manteleria SET tipo_mantel = ?, precio_mantel = ?, descrip_mantel = ?, contact_mantel = ?, tel_mantel = ?, img_mantel = ? WHERE id_mantel = ?',
            [tipo_mantel, precio_mantel, descrip_mantel, contact_mantel, tel_mantel, newImagePath, id], function(err) {
                if (err) {
                    res.status(500).send('Error al actualizar el mantel');
                    return;
                }
                res.send({ message: 'Mantel actualizado exitosamente' });
            });
    });
}

module.exports = { getLinens, insertLinen, deleteLinen, updateLinen, getLinensById };
