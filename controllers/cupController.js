const fs = require('fs');
const path = require('path');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

// Obtiene todas las copas
function getCups(req, res) {
    connection.query('SELECT * FROM Copas', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las copas');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_copa: row.img_copa ? path.basename(row.img_copa) : null
        })));
    });
}

// Obtiene una copa por ID
function getCupsById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Copas WHERE id_copa = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la copa');
            return;
        }
        res.json(rows[0]);
    });
}

// Inserta una nueva copa
function insertCup(req, res) {
    const { tipo_copa, precio_copa, descrip_copa, contact_copa, tel_copa } = req.body;
    const img_copa = req.file ? req.file.path : null; // Cambia a almacenar la ruta de la imagen

    connection.query('INSERT INTO Copas (tipo_copa, precio_copa, descrip_copa, contact_copa, tel_copa, img_copa) VALUES (?, ?, ?, ?, ?, ?)',
        [tipo_copa, precio_copa, descrip_copa, contact_copa, tel_copa, img_copa], function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar la copa');
                return;
            }
            res.send({ id: results.insertId, message: 'Copa insertada exitosamente' });
        });
}

// Elimina una copa por ID
function deleteCup(req, res) {
    const { id } = req.params;

    // Primero, obtén la ruta de la imagen que se eliminará
    connection.query('SELECT img_copa FROM Copas WHERE id_copa = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen de la copa');
            return;
        }

        const imgPath = rows[0]?.img_copa;

        // Elimina el registro de la base de datos
        connection.query('DELETE FROM Copas WHERE id_copa = ?', [id], function(err) {
            if (err) {
                res.status(500).send('Error al eliminar la copa');
                return;
            }

            // Elimina el archivo de imagen del sistema de archivos si existe
            if (imgPath) {
                fs.unlink(imgPath, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                        res.status(500).send('Error al eliminar el archivo de imagen');
                    } else {
                        res.send({ message: 'Copa eliminada exitosamente' });
                    }
                });
            } else {
                res.send({ message: 'Copa eliminada exitosamente' });
            }
        });
    });
}

// Actualiza una copa por ID
function updateCup(req, res) {
    const { id } = req.params;
    const { tipo_copa, precio_copa, descrip_copa, contact_copa, tel_copa } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    connection.query('SELECT img_copa FROM Copas WHERE id_copa = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen de la copa');
            return;
        }

        const oldImagePath = rows[0]?.img_copa;

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
        connection.query('UPDATE Copas SET tipo_copa = ?, precio_copa = ?, descrip_copa = ?, contact_copa = ?, tel_copa = ?, img_copa = ? WHERE id_copa = ?',
            [tipo_copa, precio_copa, descrip_copa, contact_copa, tel_copa, newImagePath, id], function(err) {
                if (err) {
                    res.status(500).send('Error al actualizar la copa');
                    return;
                }
                res.send({ message: 'Copa actualizada exitosamente' });
            });
    });
}

module.exports = { getCups, insertCup, deleteCup, updateCup, getCupsById };
