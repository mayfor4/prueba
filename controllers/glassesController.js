const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

// Obtiene todos los vasos
function getGlasses(req, res) {
    connection.query('SELECT * FROM Vasos', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los vasos');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_vaso: row.img_vaso ? path.basename(row.img_vaso) : null
        })));
    });
}

// Obtiene un vaso por ID
function getGlassesById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Vasos WHERE id_vaso = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener el vaso');
            return;
        }
        res.json(rows[0]);
    });
}

// Inserta un nuevo vaso
function insertGlasses(req, res) {
    const { tipo_vaso, precio_vaso, descrip_vaso, contact_vaso, tel_vaso } = req.body;
    const img_vaso = req.file ? req.file.path : null;
    connection.query(`INSERT INTO Vasos (tipo_vaso, precio_vaso, descrip_vaso, contact_vaso, tel_vaso, img_vaso) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_vaso, precio_vaso, descrip_vaso, contact_vaso, tel_vaso, img_vaso], function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar el vaso');
                return;
            }
            res.send({ id: results.insertId, message: 'Vaso insertado exitosamente' });
        });
}

// Elimina un vaso por ID
function deleteGlasses(req, res) {
    const { id } = req.params;
    
    // Primero, obtén la ruta de la imagen que se eliminará
    connection.query('SELECT img_vaso FROM Vasos WHERE id_vaso = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen del vaso');
            return;
        }
        
        const img_vaso = rows[0]?.img_vaso;

        // Elimina el registro de la base de datos
        connection.query('DELETE FROM Vasos WHERE id_vaso = ?', [id], function(err) {
            if (err) {
                res.status(500).send('Error al eliminar el vaso');
                return;
            }
            
            // Elimina el archivo de imagen del sistema de archivos si existe
            if (img_vaso) {
                fs.unlink(img_vaso, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                        res.status(500).send('Error al eliminar el archivo de imagen');
                    } else {
                        res.send({ message: 'Vaso eliminado exitosamente' });
                    }
                });
            } else {
                res.send({ message: 'Vaso eliminado exitosamente' });
            }
        });
    });
}

// Actualiza un vaso por ID
function updateGlasses(req, res) {
    const { id } = req.params;
    const { tipo_vaso, precio_vaso, descrip_vaso, contact_vaso, tel_vaso } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    connection.query('SELECT img_vaso FROM Vasos WHERE id_vaso = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen del vaso');
            return;
        }
        
        const currentImagePath = rows[0]?.img_vaso;

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
        connection.query('UPDATE Vasos SET tipo_vaso = ?, precio_vaso = ?, descrip_vaso = ?, contact_vaso = ?, tel_vaso = ?, img_vaso = ? WHERE id_vaso = ?',
            [tipo_vaso, precio_vaso, descrip_vaso, contact_vaso, tel_vaso, newImagePath, id], function(err) {
                if (err) {
                    res.status(500).send('Error al actualizar el vaso');
                    return;
                }
                res.send({ message: 'Vaso actualizado exitosamente' });
            });
    });
}

module.exports = { getGlasses, insertGlasses, deleteGlasses, updateGlasses, getGlassesById };
