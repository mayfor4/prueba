const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")
const fs = require('fs');
const path = require('path');

function getPlaques(req, res) {
    db.all('SELECT * FROM Plaque', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las placas');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_plaque: row.img_plaque ? path.basename(row.img_plaque) : null
        })));
    });
}

function getPlaquesById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Plaque WHERE id_plaque = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener plaques ');
            return;
        }
        res.json(row);
    });
}


function insertPlaque(req, res) {
    const { tipo_plaque, precio_plaque, descrip_plaque, contact_plaque, tel_plaque } = req.body;
    const img_plaque = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`INSERT INTO Plaque (tipo_plaque, precio_plaque, descrip_plaque, contact_plaque, tel_plaque, img_plaque) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_plaque, precio_plaque, descrip_plaque, contact_plaque, tel_plaque, req.file ? req.file.path : null], function(err) {
            if (err) {
                res.status(500).send('Error al insertar la placa');
                return;
            }
            res.send({ id: this.lastID, message: 'Placa insertada exitosamente' });
        });
}

function deletePlaque(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Plaque WHERE id_plaque = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la placa');
            return;
        }
        res.send({ message: 'Placa eliminada exitosamente' });
    });
}

function updatePlaque(req, res) {
    const { id } = req.params;
    const { tipo_plaque, precio_plaque, descrip_plaque, contact_plaque, tel_plaque } = req.body;
    const img_plaque = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`UPDATE Plaque SET tipo_plaque = ?, precio_plaque = ?, descrip_plaque = ?, contact_plaque = ?, tel_plaque = ?, img_plaque = ? WHERE id_plaque = ?`,
        [tipo_plaque, precio_plaque, descrip_plaque, contact_plaque, tel_plaque, req.file ? req.file.path : null, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la placa');
                return;
            }
            res.send({ message: 'Placa actualizada exitosamente' });
        });
}

module.exports = { getPlaques, insertPlaque, deletePlaque, updatePlaque,getPlaquesById };
