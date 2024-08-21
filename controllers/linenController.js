const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")
const fs = require('fs');
const path = require('path');

function getLinens(req, res) {
    db.all('SELECT * FROM Manteleria', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los manteles');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_mantel: row.img_mantel ? path.basename(row.img_mantel) : null
        })));
    });
}

function  getLinensById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Manteleria WHERE id_mantel = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener manteleria ');
            return;
        }
        res.json(row);
    });
}

function insertLinen(req, res) {
    const { tipo_mantel, precio_mantel, descrip_mantel, contact_mantel, tel_mantel } = req.body;
    const img_mantel = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`INSERT INTO Manteleria (tipo_mantel, precio_mantel, descrip_mantel, contact_mantel, tel_mantel, img_mantel) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_mantel, precio_mantel, descrip_mantel, contact_mantel, tel_mantel, req.file ? req.file.path : null], function(err) {
            if (err) {
                res.status(500).send('Error al insertar el mantel');
                return;
            }
            res.send({ id: this.lastID, message: 'Mantel insertado exitosamente' });
        });
}

function deleteLinen(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Manteleria WHERE id_mantel = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el mantel');
            return;
        }
        res.send({ message: 'Mantel eliminado exitosamente' });
    });
}

function updateLinen(req, res) {
    const { id } = req.params;
    const { tipo_mantel, precio_mantel, descrip_mantel, contact_mantel, tel_mantel } = req.body;
    const img_mantel = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`UPDATE Manteleria SET tipo_mantel = ?, precio_mantel = ?, descrip_mantel = ?, contact_mantel = ?, tel_mantel = ?, img_mantel = ? WHERE id_mantel = ?`,
        [tipo_mantel, precio_mantel, descrip_mantel, contact_mantel, tel_mantel, req.file ? req.file.path : null, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el mantel');
                return;
            }
            res.send({ message: 'Mantel actualizado exitosamente' });
        });
}

module.exports = { getLinens, insertLinen, deleteLinen, updateLinen, getLinensById };
