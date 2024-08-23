const mysql = require('mysql');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL
const fs = require('fs');
const path = require('path');

// Obtiene todas las servilletas
function getNapkins(req, res) {
    connection.query('SELECT * FROM Servilletas', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las servilletas');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_servilleta: row.img_servilleta ? path.basename(row.img_servilleta) : null
        })));
    });
}

// Obtiene una servilleta por ID
function getNapkinsById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Servilletas WHERE id_servilleta = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener servilleta');
            return;
        }
        res.json(results[0]);
    });
}

// Inserta una nueva servilleta
function insertNapkin(req, res) {
    const { tipo_servilleta, precio_servilleta, descrip_servilleta, contact_servilleta, tel_servilleta } = req.body;
    const img_servilleta = req.file ? req.file.path : null;
    connection.query('INSERT INTO Servilletas (tipo_servilleta, precio_servilleta, descrip_servilleta, contact_servilleta, tel_servilleta, img_servilleta) VALUES (?, ?, ?, ?, ?, ?)',
        [tipo_servilleta, precio_servilleta, descrip_servilleta, contact_servilleta, tel_servilleta, img_servilleta], function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar la servilleta');
                return;
            }
            res.send({ id: results.insertId, message: 'Servilleta insertada exitosamente' });
        });
}

// Elimina una servilleta por ID
function deleteNapkin(req, res) {
    const { id } = req.params;
    
    // Primero, obtén la ruta de la imagen que se eliminará
    connection.query('SELECT img_servilleta FROM Servilletas WHERE id_servilleta = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen de la servilleta');
            return;
        }
        
        const row = results[0];
        
        // Elimina el registro de la base de datos
        connection.query('DELETE FROM Servilletas WHERE id_servilleta = ?', [id], function(err) {
            if (err) {
                res.status(500).send('Error al eliminar la servilleta');
                return;
            }
            
            // Elimina el archivo de imagen del sistema de archivos si existe
            if (row.img_servilleta) {
                fs.unlink(row.img_servilleta, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                        res.status(500).send('Error al eliminar el archivo de imagen');
                    } else {
                        res.send({ message: 'Servilleta eliminada exitosamente', success: 'La servilleta ha sido eliminada correctamente' });
                    }
                });
            } else {
                res.send({ message: 'Servilleta eliminada exitosamente', success: 'La servilleta ha sido eliminada correctamente' });
            }
        });
    });
}

// Actualiza una servilleta por ID
function updateNapkin(req, res) {
    const { id } = req.params;
    const { tipo_servilleta, precio_servilleta, descrip_servilleta, contact_servilleta, tel_servilleta } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    connection.query('SELECT img_servilleta FROM Servilletas WHERE id_servilleta = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen de la servilleta');
            return;
        }
        
        const row = results[0];
        
        // Si se proporciona una nueva imagen, elimina la imagen anterior
        if (newImagePath && row.img_servilleta && row.img_servilleta !== newImagePath) {
            fs.unlink(row.img_servilleta, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo de imagen:', err);
                    res.status(500).send('Error al eliminar el archivo de imagen');
                }
            });
        }
        
        // Si no se proporciona una nueva imagen, mantenemos la imagen actual
        if (!newImagePath && row) {
            newImagePath = row.img_servilleta;
        }

        // Luego, actualiza el registro
        connection.query('UPDATE Servilletas SET tipo_servilleta = ?, precio_servilleta = ?, descrip_servilleta = ?, contact_servilleta = ?, tel_servilleta = ?, img_servilleta = ? WHERE id_servilleta = ?',
            [tipo_servilleta, precio_servilleta, descrip_servilleta, contact_servilleta, tel_servilleta, newImagePath, id], function(err) {
                if (err) {
                    res.status(500).send('Error al actualizar la servilleta');
                    return;
                }
                res.send({ message: 'Servilleta actualizada exitosamente', success: 'La servilleta ha sido actualizada correctamente' });
            });
    });
}

module.exports = { getNapkins, insertNapkin, deleteNapkin, updateNapkin, getNapkinsById };
