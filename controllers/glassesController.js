const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")
const fs = require('fs');
const path = require('path');

function getGlasses(req, res) {
    db.all('SELECT * FROM Vasos', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los vasos');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_vaso: row.img_vaso ? path.basename(row.img_vaso) : null
        })));
    });
}

function  getGlassesById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Vasos WHERE id_vaso = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener vasos ');
            return;
        }
        res.json(row);
    });
}

function insertGlasses(req, res) {
    const { tipo_vaso, precio_vaso, descrip_vaso, contact_vaso, tel_vaso } = req.body;
    const img_vaso = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`INSERT INTO Vasos (tipo_vaso, precio_vaso, descrip_vaso, contact_vaso, tel_vaso, img_vaso) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_vaso, precio_vaso, descrip_vaso, contact_vaso, tel_vaso, req.file ? req.file.path : null], function(err) {
            if (err) {
                res.status(500).send('Error al insertar el vaso');
                return;
            }
            res.send({ id: this.lastID, message: 'Vaso insertado exitosamente' });
        });
}

function deleteGlasses(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Vasos WHERE id_vaso = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el vaso');
            return;
        }
        res.send({ message: 'Vaso eliminado exitosamente' });
    });
}

function updateGlasses(req, res) {
    const { id } = req.params;
    const { tipo_vaso, precio_vaso, descrip_vaso, contact_vaso, tel_vaso } = req.body;
    const img_vaso = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`UPDATE Vasos SET tipo_vaso = ?, precio_vaso = ?, descrip_vaso = ?, contact_vaso = ?, tel_vaso = ?, img_vaso = ? WHERE id_vaso = ?`,
        [tipo_vaso, precio_vaso, descrip_vaso, contact_vaso, tel_vaso, req.file ? req.file.path : null, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el vaso');
                return;
            }
            res.send({ message: 'Vaso actualizado exitosamente' });
        });
}

module.exports = { getGlasses, insertGlasses, deleteGlasses, updateGlasses, getGlassesById };