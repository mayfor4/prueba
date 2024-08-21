const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")
const fs = require('fs');
const path = require('path');

function getDinnerware(req, res) {
    db.all('SELECT * FROM Loza', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la loza');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_loza: row.img_loza ? path.basename(row.img_loza) : null
        })));
    });
}

function getDinnerwareById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Loza WHERE id_loza  = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener Lozas ');
            return;
        }
        res.json(row);
    });
}



function insertDinnerware(req, res) {
    const { tipo_loza, precio_loza, descrip_loza, contact_loza, tel_loza } = req.body;
    const img_loza = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`INSERT INTO Loza (tipo_loza, precio_loza, descrip_loza, contact_loza, tel_loza, img_loza) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_loza, precio_loza, descrip_loza, contact_loza, tel_loza, req.file ? req.file.path : null], function(err) {
            if (err) {
                res.status(500).send('Error al insertar la loza');
                return;
            }
            res.send({ id: this.lastID, message: 'Loza insertada exitosamente' });
        });
}

function deleteDinnerware(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Loza WHERE id_loza = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la loza');
            return;
        }
        res.send({ message: 'Loza eliminada exitosamente' });
    });
}

function updateDinnerware(req, res) {
    const { id } = req.params;
    const { tipo_loza, precio_loza, descrip_loza, contact_loza, tel_loza } = req.body;
    const img_loza = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`UPDATE Loza SET tipo_loza = ?, precio_loza = ?, descrip_loza = ?, contact_loza = ?, tel_loza = ?, img_loza = ? WHERE id_loza = ?`,
        [tipo_loza, precio_loza, descrip_loza, contact_loza, tel_loza, req.file ? req.file.path : null, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la loza');
                return;
            }
            res.send({ message: 'Loza actualizada exitosamente' });
        });
}

module.exports = { getDinnerware, insertDinnerware, deleteDinnerware, updateDinnerware, getDinnerwareById };
