const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")
const fs = require('fs');

const path = require('path');


function getChairs(req, res) {
    db.all('SELECT * FROM Sillas', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las sillas');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_silla: row.img_silla ? path.basename(row.img_silla) : null
        })));
    });
}


function getChairsById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Sillas WHERE id_silla  = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener otros ');
            return;
        }
        res.json(row);
    });
}

function insertChair(req, res) {
    const { tipo_silla, precio_silla, descrip_silla, contact_silla, tel_silla } = req.body;
    const img_silla = req.file ? fs.readFileSync(req.file.path) : null;
    db.run('INSERT INTO Sillas (tipo_silla, precio_silla, descrip_silla, contact_silla, tel_silla, img_silla) VALUES (?, ?, ?, ?, ?, ?)',
        [tipo_silla, precio_silla, descrip_silla, contact_silla, tel_silla, req.file ? req.file.path : null], function(err) {
            if (err) {
                res.status(500).send('Error al insertar la silla');
                return;
            }
            res.send({ id: this.lastID, message: 'Silla insertada exitosamente' });
        });
    }
 
function deleteChair(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Sillas WHERE id_silla = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la silla');
            return;
        }
        res.send({ message: 'Silla eliminada exitosamente' });
    });
}

function updateChair(req, res) {
    const { id } = req.params;
    const { tipo_silla, precio_silla, descrip_silla, contact_silla, tel_silla } = req.body;
    const img_silla = req.file ? fs.readFileSync(req.file.path) : null;

    db.run(`UPDATE Sillas SET tipo_silla = ?, precio_silla = ?, descrip_silla = ?, contact_silla = ?, tel_silla = ?, img_silla = ? WHERE id_silla = ?`,
        [tipo_silla, precio_silla, descrip_silla, contact_silla, tel_silla, req.file ? req.file.path : null, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la silla');
                return;
            }
            res.send({ message: 'Silla actualizada exitosamente' });
        });
}

module.exports = { getChairs, insertChair, deleteChair, updateChair,getChairsById };
