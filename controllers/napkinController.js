const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")
const fs = require('fs');
const path = require('path');

function getNapkins(req, res) {
    db.all('SELECT * FROM Servilletas', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las servilletas');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_servilleta: row.img_servilleta ? path.basename(row.img_servilleta) : null
        })));
    });
}

function getNapkinsById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Servilletas WHERE id_servilleta = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener servilletas ');
            return;
        }
        res.json(row);
    });
}

function insertNapkin(req, res) {
    const { tipo_servilleta, precio_servilleta, descrip_servilleta, contact_servilleta, tel_servilleta } = req.body;
    const img_servilleta = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`INSERT INTO Servilletas (tipo_servilleta, precio_servilleta, descrip_servilleta, contact_servilleta, tel_servilleta, img_servilleta) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_servilleta, precio_servilleta, descrip_servilleta, contact_servilleta, tel_servilleta, req.file ? req.file.path : null], function(err) {
            if (err) {
                res.status(500).send('Error al insertar la servilleta');
                return;
            }
            res.send({ id: this.lastID, message: 'Servilleta insertada exitosamente' });
        });
}

function deleteNapkin(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Servilletas WHERE id_servilleta = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la servilleta');
            return;
        }
        res.send({ message: 'Servilleta eliminada exitosamente' });
    });
}

function updateNapkin(req, res) {
    const { id } = req.params;
    const { tipo_servilleta, precio_servilleta, descrip_servilleta, contact_servilleta, tel_servilleta } = req.body;
    const img_servilleta = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`UPDATE Servilletas SET tipo_servilleta = ?, precio_servilleta = ?, descrip_servilleta = ?, contact_servilleta = ?, tel_servilleta = ?, img_servilleta = ? WHERE id_servilleta = ?`,
        [tipo_servilleta, precio_servilleta, descrip_servilleta, contact_servilleta, tel_servilleta, req.file ? req.file.path : null, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la servilleta');
                return;
            }
            res.send({ message: 'Servilleta actualizada exitosamente' });
        });
}

module.exports = { getNapkins, insertNapkin, deleteNapkin, updateNapkin,getNapkinsById };
