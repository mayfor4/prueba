const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")

const fs = require('fs');
const path = require('path');

function getCenterpieces(req, res) {
    db.all('SELECT * FROM Centro_Mesa', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los centros de mesa');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_cm: row.img_cm ? path.basename(row.img_cm) : null
        })));
    });
}

function getCenterpiecesById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Centro_Mesa WHERE id_cm = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener centros de mesa ');
            return;
        }
        res.json(row);
    });
}



function insertCenterpiece(req, res) {
    const { tipo_cm, precio_cm, descrip_cm, contact_cm, tel_cm } = req.body;
    const img_cm = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`INSERT INTO Centro_Mesa (tipo_cm, precio_cm, descrip_cm, contact_cm, tel_cm, img_cm) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_cm, precio_cm, descrip_cm, contact_cm, tel_cm, req.file ? req.file.path : null], function(err) {
            if (err) {
                res.status(500).send('Error al insertar el centro de mesa');
                return;
            }
            res.send({ id: this.lastID, message: 'Centro de mesa insertado exitosamente' });
        });
}

function deleteCenterpiece(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Centro_Mesa WHERE id_cm = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el centro de mesa');
            return;
        }
        res.send({ message: 'Centro de mesa eliminado exitosamente' });
    });
}

function updateCenterpiece(req, res) {
    const { id } = req.params;
    const { tipo_cm, precio_cm, descrip_cm, contact_cm, tel_cm } = req.body;
    const img_cm = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`UPDATE Centro_Mesa SET tipo_cm = ?, precio_cm = ?, descrip_cm = ?, contact_cm = ?, tel_cm = ?, img_cm = ? WHERE id_cm = ?`,
        [tipo_cm, precio_cm, descrip_cm, contact_cm, tel_cm, req.file ? req.file.path : null, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el centro de mesa');
                return;
            }
            res.send({ message: 'Centro de mesa actualizado exitosamente' });
        });
}

module.exports = { getCenterpieces, insertCenterpiece, deleteCenterpiece, updateCenterpiece, getCenterpiecesById };
