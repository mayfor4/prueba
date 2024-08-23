const connection = require('./mysqlConnection'); // Importa la conexión MySQL
const fs = require('fs');
const path = require('path');

function getTables(req, res) {
    connection.query('SELECT * FROM Mesas', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las mesas');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_mesa: row.img_mesa ? path.basename(row.img_mesa) : null
        })));
    });
}

function getTablesById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Mesas WHERE id_mesa = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la mesa');
            return;
        }
        res.json(rows[0]);
    });
}


// Función para insertar una nueva mesa
function insertTable(req, res) {
    const { tipo_mesa, precio_mesa, descrip_mesa, contact_mesa, tel_mesa } = req.body;
    const img_mesa = req.file ? req.file.path : null; // Guardamos la ruta del archivo

    const query = `INSERT INTO Mesas (tipo_mesa, precio_mesa, descrip_mesa, contact_mesa, tel_mesa, img_mesa) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(query, [tipo_mesa, precio_mesa, descrip_mesa, contact_mesa, tel_mesa, img_mesa], (err, result) => {
        if (err) {
            res.status(500).send('Error al insertar la mesa');
            return;
        }
        res.send({ id: result.insertId, message: 'Mesa insertada exitosamente' });
    });
}





function deleteTable(req, res) {
    const { id } = req.params;

    // Primero, obtén la ruta de la imagen que se eliminará
    connection.query('SELECT img_mesa FROM Mesas WHERE id_mesa = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send({ message: 'Error al obtener la imagen de la mesa' });
            return;
        }

        const imgPath = rows[0].img_mesa;

        // Elimina el registro de la base de datos
        connection.query('DELETE FROM Mesas WHERE id_mesa = ?', [id], function(err) {
            if (err) {
                res.status(500).send({ message: 'Error al eliminar la mesa' });
                return;
            }

            // Elimina el archivo de imagen del sistema de archivos si existe
            if (imgPath) {
                fs.unlink(imgPath, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                        res.status(500).send({ message: 'Error al eliminar el archivo de imagen' });
                    } else {
                        res.send({ message: 'Mesa eliminada exitosamente', success: 'La mesa ha sido eliminada correctamente' });
                    }
                });
            } else {
                res.send({ message: 'Mesa eliminada exitosamente', success: 'La mesa ha sido eliminada correctamente' });
            }
        });
    });
}

function updateTable(req, res) {
    const { id } = req.params;
    const { tipo_mesa, precio_mesa, descrip_mesa, contact_mesa, tel_mesa } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    connection.query('SELECT img_mesa FROM Mesas WHERE id_mesa = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send({ message: 'Error al obtener la imagen de la mesa' });
            return;
        }

        const currentImagePath = rows[0].img_mesa;

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
            `UPDATE Mesas SET tipo_mesa = ?, precio_mesa = ?, descrip_mesa = ?, contact_mesa = ?, tel_mesa = ?, img_mesa = ? WHERE id_mesa = ?`,
            [tipo_mesa, precio_mesa, descrip_mesa, contact_mesa, tel_mesa, newImagePath, id],
            function(err) {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar la mesa' });
                    return;
                }
                res.send({ message: 'Mesa actualizada exitosamente', success: 'La mesa ha sido actualizada correctamente' });
            }
        );
    });
}

module.exports = { getTables, insertTable, deleteTable, updateTable, getTablesById };
