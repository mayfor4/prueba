const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")
const fs = require('fs');
const path = require('path');

function getOthers(req, res) {
    db.all('SELECT * FROM Otros', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los otros');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_otro: row.img_otro ? path.basename(row.img_otro) : null
        })));
    });
}

function getOthersById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Otros WHERE id_otro = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener otros ');
            return;
        }
        res.json(row);
    });
}

function insertOther(req, res) {
    const { tipo_otro, precio_otro, descrip_otro, contact_otro, tel_otro } = req.body;
    const img_otro = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`INSERT INTO Otros (tipo_otro, precio_otro, descrip_otro, contact_otro, tel_otro, img_otro) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_otro, precio_otro, descrip_otro, contact_otro, tel_otro, req.file ? req.file.path : null], function(err) {
            if (err) {
                res.status(500).send('Error al insertar el otro');
                return;
            }
            res.send({ id: this.lastID, message: 'Otro insertado exitosamente' });
        });
}

function deleteOther(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Otros WHERE id_otro = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el otro');
            return;
        }
        res.send({ message: 'Otro eliminado exitosamente' });
    });
}

function updateOther(req, res) {
    const { id } = req.params;
    const { tipo_otro, precio_otro, descrip_otro, contact_otro, tel_otro } = req.body;
    const img_otro = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`UPDATE Otros SET tipo_otro = ?, precio_otro = ?, descrip_otro = ?, contact_otro = ?, tel_otro = ?, img_otro = ? WHERE id_otro = ?`,
        [tipo_otro, precio_otro, descrip_otro, contact_otro, tel_otro, req.file ? req.file.path : null, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el otro');
                return;
            }
            res.send({ message: 'Otro actualizado exitosamente' });
        });
}

module.exports = { getOthers, insertOther, deleteOther, updateOther,getOthersById };
