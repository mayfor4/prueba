const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")
const fs = require('fs');
const path = require('path');

function getPlaces(req, res) {
    db.all('SELECT * FROM Lugar', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los lugares');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_lugar: row.img_lugar ? path.basename(row.img_lugar) : null
        })));
    });
}

function getPlacesById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Lugar WHERE id_lugar = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener lugares ');
            return;
        }
        res.json(row);
    });
}





function insertPlace(req, res) {
    const { nombre_lugar, tipo_lugar, dir_lugar, zona_lugar, capacidad_lugar, contact_lugar, tel_lugar, adicional_lugar, condiciones_lugar, paq1_lugar, paq2_lugar, paq3_lugar, paq4_lugar, paq5_lugar, paq6_lugar } = req.body;
    const img_lugar = req.file ? req.file.path : null;

    db.run(`INSERT INTO Lugar (nombre_lugar, tipo_lugar, dir_lugar, zona_lugar, capacidad_lugar, contact_lugar, tel_lugar, adicional_lugar, condiciones_lugar, paq1_lugar, paq2_lugar, paq3_lugar, paq4_lugar, paq5_lugar, paq6_lugar, img_lugar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [nombre_lugar, tipo_lugar, dir_lugar, zona_lugar, capacidad_lugar, contact_lugar, tel_lugar, adicional_lugar, condiciones_lugar, paq1_lugar, paq2_lugar, paq3_lugar, paq4_lugar, paq5_lugar, paq6_lugar, img_lugar], function(err) {
            if (err) {
                res.status(500).send('Error al insertar el lugar');
                return;
            }
            res.send({ id: this.lastID, message: 'Lugar insertado exitosamente' });
        });
}





function deletePlace(req, res) {
    const { id } = req.params;
    
    // Primero, obtén la ruta de la imagen que se eliminará
    db.get('SELECT img_lugar FROM Lugar WHERE id_lugar = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen del lugar');
            return;
        }
        
        // Elimina el registro de la base de datos
        db.run('DELETE FROM Lugar WHERE id_lugar = ?', [id], function(err) {
            if (err) {
                res.status(500).send('Error al eliminar el lugar');
                return;
            }
            
            // Elimina el archivo de imagen del sistema de archivos si existe
            if (row.img_lugar) {
                fs.unlink(row.img_lugar, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo de imagen:', err);
                    }
                });
            }
            
            res.send({ message: 'Lugar eliminado exitosamente' });
        });
    });
}

function updatePlace(req, res) {
    const { id } = req.params;
    const { nombre_lugar, tipo_lugar, dir_lugar, zona_lugar, capacidad_lugar, contact_lugar, tel_lugar, adicional_lugar, condiciones_lugar, paq1_lugar, paq2_lugar, paq3_lugar, paq4_lugar, paq5_lugar, paq6_lugar } = req.body;
    let newImagePath = req.file ? req.file.path : null;

    // Primero, obtén la imagen actual
    db.get('SELECT img_lugar FROM Lugar WHERE id_lugar = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener la imagen del lugar');
            return;
        }
        
        // Si se proporciona una nueva imagen, elimina la imagen anterior
        if (newImagePath && row.img_lugar && row.img_lugar !== newImagePath) {
            fs.unlink(row.img_lugar, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo de imagen:', err);
                }
            });
        }
        
        // Si no se proporciona una nueva imagen, mantenemos la imagen actual
        if (!newImagePath && row) {
            newImagePath = row.img_lugar;
        }

        // Luego, actualiza el registro
        db.run('UPDATE Lugar SET nombre_lugar = ?, tipo_lugar = ?, dir_lugar = ?, zona_lugar = ?, capacidad_lugar = ?, contact_lugar = ?, tel_lugar = ?, adicional_lugar = ?, condiciones_lugar = ?, paq1_lugar = ?, paq2_lugar = ?, paq3_lugar = ?, paq4_lugar = ?, paq5_lugar = ?, paq6_lugar = ?, img_lugar = ? WHERE id_lugar = ?',
            [nombre_lugar, tipo_lugar, dir_lugar, zona_lugar, capacidad_lugar, contact_lugar, tel_lugar, adicional_lugar, condiciones_lugar, paq1_lugar, paq2_lugar, paq3_lugar, paq4_lugar, paq5_lugar, paq6_lugar, newImagePath, id], function(err) {
                if (err) {
                    res.status(500).send('Error al actualizar el lugar');
                    return;
                }
                res.send({ message: 'Lugar actualizado exitosamente' });
            });
    });
}



module.exports = { getPlaces, insertPlace, deletePlace, updatePlace, getPlacesById };