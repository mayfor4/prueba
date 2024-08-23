const mysql = require('mysql');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL
const fs = require('fs');
const path = require('path');

// Obtiene todos los otros
function getOthers(req, res) {
    connection.query('SELECT * FROM Otros', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los otros');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_otro: row.img_otro ? path.basename(row.img_otro) : null
        })));
    });
}

// Obtiene un otro por ID
function getOthersById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Otros WHERE id_otro = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener el otro');
            return;
        }
        res.json(results[0]);
    });
}

// Inserta un nuevo otro
function insertOther(req, res) {
    const { tipo_otro, precio_otro, descrip_otro, contact_otro, tel_otro } = req.body;
    const img_otro = req.file ? req.file.path : null;
    connection.query('INSERT INTO Otros (tipo_otro, precio_otro, descrip_otro, contact_otro, tel_otro, img_otro) VALUES (?, ?, ?, ?, ?, ?)',
        [tipo_otro, precio_otro, descrip_otro, contact_otro, tel_otro, img_otro], function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar el otro');
                return;
            }
            res.send({ id: results.insertId, message: 'Otro insertado exitosamente' });
        });
}

// Elimina un otro por ID
function deleteOther(req, res) {
    const { id } = req.params;
    
    // Primero, obtén la ruta de la imagen que se eliminará
    connection.query('SELECT img_otro FROM Otros WHERE id_otro = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen del otro');
            return;
        }
        
        const row = results[0];
        
        // Elimina el registro de la base de datos
        connection.query('DELETE FROM Otros WHERE id_otro = ?', [id], function(err) {
            if (err) {
                res.status(500).send('Error al eliminar el otro');
                return;
            }
            
            // Elimina el archivo de imagen del sistema de archivos si existe
            if (row.img_otro) {
                fs.unlink(row.img_otro, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                        res.status(500).send('Error al eliminar el archivo de imagen');
                    } else {
                        res.send({ message: 'Otro eliminado exitosamente', success: 'El otro ha sido eliminado correctamente' });
                    }
                });
            } else {
                res.send({ message: 'Otro eliminado exitosamente', success: 'El otro ha sido eliminado correctamente' });
            }
        });
    });
}

// Actualiza un otro por ID
function updateOther(req, res) {
    const { id } = req.params;
    const { tipo_otro, precio_otro, descrip_otro, contact_otro, tel_otro } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    connection.query('SELECT img_otro FROM Otros WHERE id_otro = ?', [id], (err, results) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen del otro');
            return;
        }
        
        const row = results[0];
        
        // Si se proporciona una nueva imagen, elimina la imagen anterior
        if (newImagePath && row.img_otro && row.img_otro !== newImagePath) {
            fs.unlink(row.img_otro, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo de imagen:', err);
                    res.status(500).send('Error al eliminar el archivo de imagen');
                }
            });
        }
        
        // Si no se proporciona una nueva imagen, mantenemos la imagen actual
        if (!newImagePath && row) {
            newImagePath = row.img_otro;
        }

        // Luego, actualiza el registro
        connection.query('UPDATE Otros SET tipo_otro = ?, precio_otro = ?, descrip_otro = ?, contact_otro = ?, tel_otro = ?, img_otro = ? WHERE id_otro = ?',
            [tipo_otro, precio_otro, descrip_otro, contact_otro, tel_otro, newImagePath, id], function(err) {
                if (err) {
                    res.status(500).send('Error al actualizar el otro');
                    return;
                }
                res.send({ message: 'Otro actualizado exitosamente', success: 'El otro ha sido actualizado correctamente' });
            });
    });
}

module.exports = { getOthers, insertOther, deleteOther, updateOther, getOthersById };
