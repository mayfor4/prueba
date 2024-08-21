const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")

function getPhotos(req, res) {
    db.all('SELECT * FROM Fotos', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las fotos');
            return;
        }
        res.json(rows);
    });
}


function getPhotosById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Fotos WHERE id_foto = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener fotos ');
            return;
        }
        res.json(row);
    });
}


function insertPhoto(req, res) {
    const { tipo_foto, descrip_foto, precio_foto, contact_foto, tel_foto } = req.body;
    db.run(`INSERT INTO Fotos (tipo_foto, descrip_foto, precio_foto, contact_foto, tel_foto) VALUES (?, ?, ?, ?, ?)`,
        [tipo_foto, descrip_foto, precio_foto, contact_foto, tel_foto], function(err) {
            if (err) {
                res.status(500).send('Error al insertar la foto');
                return;
            }
            res.send({ id: this.lastID, message: 'Foto insertada exitosamente' });
        });
}

function deletePhoto(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Fotos WHERE id_foto = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la foto');
            return;
        }
        res.send({ message: 'Foto eliminada exitosamente' });
    });
}

function updatePhoto(req, res) {
    const { id } = req.params;
    const { tipo_foto, descrip_foto, precio_foto, contact_foto, tel_foto } = req.body;
    db.run(`UPDATE Fotos SET tipo_foto = ?, descrip_foto = ?, precio_foto = ?, contact_foto = ?, tel_foto = ? WHERE id_foto = ?`,
        [tipo_foto, descrip_foto, precio_foto, contact_foto, tel_foto, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la foto');
                return;
            }
            res.send({ message: 'Foto actualizada exitosamente' });
        });
}

module.exports = { getPhotos, insertPhoto, deletePhoto, updatePhoto,getPhotosById };
