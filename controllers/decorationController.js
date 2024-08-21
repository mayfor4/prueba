const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")
const fs = require('fs');
const path = require('path');

function getDecorations(req, res) {
    db.all('SELECT * FROM Decoracion', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las decoraciones');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_dec: row.img_dec ? path.basename(row.img_dec) : null
        })));
    });
}

function getDecorationsById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Decoracion WHERE id_dec = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtene decoracion ');
            return;
        }
        res.json(row);
    });
}



function insertDecoration(req, res) {
    const { tipo_dec, precio_dec, decrip_dec, contact_dec, tel_dec } = req.body;
    const img_dec = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`INSERT INTO Decoracion (tipo_dec, precio_dec, decrip_dec, contact_dec, tel_dec, img_dec) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_dec, precio_dec, decrip_dec, contact_dec, tel_dec, req.file ? req.file.path : null], function(err) {
            if (err) {
                res.status(500).send('Error al insertar la decoración');
                return;
            }
            res.send({ id: this.lastID, message: 'Decoración insertada exitosamente' });
        });
}

function deleteDecoration(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Decoracion WHERE id_dec = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la decoración');
            return;
        }
        res.send({ message: 'Decoración eliminada exitosamente' });
    });
}

function updateDecoration(req, res) {
    const { id } = req.params;
    const { tipo_dec, precio_dec, decrip_dec, contact_dec, tel_dec } = req.body;
    const img_dec = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`UPDATE Decoracion SET tipo_dec = ?, precio_dec = ?, decrip_dec = ?, contact_dec = ?, tel_dec = ?, img_dec = ? WHERE id_dec = ?`,
        [tipo_dec, precio_dec, decrip_dec, contact_dec, tel_dec, req.file ? req.file.path : null, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la decoración');
                return;
            }
            res.send({ message: 'Decoración actualizada exitosamente' });
        });
}

module.exports = { getDecorations, insertDecoration, deleteDecoration, updateDecoration, getDecorationsById };
