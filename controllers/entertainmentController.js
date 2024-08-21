const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")

function getEntertainment(req, res) {
    db.all('SELECT * FROM Diversion', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la diversión');
            return;
        }
        res.json(rows);
    });
}

function getEntertainmentById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Diversion WHERE id_diversion = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener diversion ');
            return;
        }
        res.json(row);
    });
}




function insertEntertainment(req, res) {
    const { tipo_diversion, descrip_diversion, precio_diversion, contact_diversion, tel_diversion } = req.body;
    db.run(`INSERT INTO Diversion (tipo_diversion, descrip_diversion, precio_diversion, contact_diversion, tel_diversion) VALUES (?, ?, ?, ?, ?)`,
        [tipo_diversion, descrip_diversion, precio_diversion, contact_diversion, tel_diversion], function(err) {
            if (err) {
                res.status(500).send('Error al insertar la diversión');
                return;
            }
            res.send({ id: this.lastID, message: 'Diversión insertada exitosamente' });
        });
}

function deleteEntertainment(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Diversion WHERE id_diversion = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la diversión');
            return;
        }
        res.send({ message: 'Diversión eliminada exitosamente' });
    });
}

function updateEntertainment(req, res) {
    const { id } = req.params;
    const { tipo_diversion, descrip_diversion, precio_diversion, contact_diversion, tel_diversion } = req.body;
    db.run(`UPDATE Diversion SET tipo_diversion = ?, descrip_diversion = ?, precio_diversion = ?, contact_diversion = ?, tel_diversion = ? WHERE id_diversion = ?`,
        [tipo_diversion, descrip_diversion, precio_diversion, contact_diversion, tel_diversion, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la diversión');
                return;
            }
            res.send({ message: 'Diversión actualizada exitosamente' });
        });
}

module.exports = { getEntertainment, insertEntertainment, deleteEntertainment, updateEntertainment,getEntertainmentById };
