const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")

function getMusic(req, res) {
    db.all('SELECT * FROM Musica', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la música');
            return;
        }
        res.json(rows);
    });
}

function insertMusic(req, res) {
    const { tipo_music, nom_grupo, descrip_music, precio_music, tel_music } = req.body;
    db.run(`INSERT INTO Musica (tipo_music, nom_grupo, descrip_music, precio_music, tel_music) VALUES (?, ?, ?, ?, ?)`,
        [tipo_music, nom_grupo, descrip_music, precio_music, tel_music], function(err) {
            if (err) {
                res.status(500).send('Error al insertar la música');
                return;
            }
            res.send({ id: this.lastID, message: 'Música insertada exitosamente' });
        });
}

function deleteMusic(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Musica WHERE id_music = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la música');
            return;
        }
        res.send({ message: 'Música eliminada exitosamente' });
    });
}

function updateMusic(req, res) {
    const { id } = req.params;
    const { tipo_music, nom_grupo, descrip_music, precio_music, tel_music } = req.body;
    db.run(`UPDATE Musica SET tipo_music = ?, nom_grupo = ?, descrip_music = ?, precio_music = ?, tel_music = ? WHERE id_music = ?`,
        [tipo_music, nom_grupo, descrip_music, precio_music, tel_music, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la música');
                return;
            }
            res.send({ message: 'Música actualizada exitosamente' });
        });
}

module.exports = { getMusic, insertMusic, deleteMusic, updateMusic };
