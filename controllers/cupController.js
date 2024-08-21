const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")
const fs = require('fs');
const path = require('path');

function getCups(req, res) {
    db.all('SELECT * FROM Copas', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las copas');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_copa: row.img_copa ? path.basename(row.img_copa) : null
        })));
    });
}

function getCupsById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Copas WHERE id_copa = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener copas ');
            return;
        }
        res.json(row);
    });
}

function insertCup(req, res) {
    const { tipo_copa, precio_copa, descrip_copa, contact_copa, tel_copa } = req.body;
    const img_copa = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`INSERT INTO Copas (tipo_copa, precio_copa, descrip_copa, contact_copa, tel_copa, img_copa) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_copa, precio_copa, descrip_copa, contact_copa, tel_copa, req.file ? req.file.path : null], function(err) {
            if (err) {
                res.status(500).send('Error al insertar la copa');
                return;
            }
            res.send({ id: this.lastID, message: 'Copa insertada exitosamente' });
        });
}

function deleteCup(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Copas WHERE id_copa = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la copa');
            return;
        }
        res.send({ message: 'Copa eliminada exitosamente' });
    });
}

function updateCup(req, res) {
    const { id } = req.params;
    const { tipo_copa, precio_copa, descrip_copa, contact_copa, tel_copa } = req.body;
    const img_copa = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`UPDATE Copas SET tipo_copa = ?, precio_copa = ?, descrip_copa = ?, contact_copa = ?, tel_copa = ?, img_copa = ? WHERE id_copa = ?`,
        [tipo_copa, precio_copa, descrip_copa, contact_copa, tel_copa, req.file ? req.file.path : null, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la copa');
                return;
            }
            res.send({ message: 'Copa actualizada exitosamente' });
        });
}

module.exports = { getCups, insertCup, deleteCup, updateCup, getCupsById };
