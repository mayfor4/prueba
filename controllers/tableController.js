const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")
const fs = require('fs');
const path = require('path');

function getTables(req, res) {
    db.all('SELECT * FROM mesas', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las mesas');
            return;
        }
        res.json(rows.map(row => ({
            ...row,
            img_mesa: row.img_mesa ? path.basename(row.img_mesa) : null
        })));
    });
}


function getTablesById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM mesas WHERE id_mesa = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener el mesa');
            return;
        }
        res.json(row);
    });
}



function insertTable(req, res) {
    const { tipo_mesa, precio_mesa, descrip_mesa, contact_mesa, tel_mesa } = req.body;
    const img_mesa = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`INSERT INTO mesas (tipo_mesa, precio_mesa, descrip_mesa, contact_mesa, tel_mesa, img_mesa) VALUES (?, ?, ?, ?, ?, ?)`,
        [tipo_mesa, precio_mesa, descrip_mesa, contact_mesa, tel_mesa, req.file ? req.file.path : null], function(err) {
            if (err) {
                res.status(500).send('Error al insertar la mesa');
                return;
            }
            res.send({ id: this.lastID, message: 'Mesa insertada exitosamente' });
        });
}

function deleteTable(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM mesas WHERE id_mesa = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la mesa');
            return;
        }
        res.send({ message: 'Mesa eliminada exitosamente' });
    });
}

function updateTable(req, res) {
    const { id } = req.params;
    const { tipo_mesa, precio_mesa, descrip_mesa, contact_mesa, tel_mesa } = req.body;
    const img_mesa = req.file ? fs.readFileSync(req.file.path) : null;
    db.run(`UPDATE mesas SET tipo_mesa = ?, precio_mesa = ?, descrip_mesa = ?, contact_mesa = ?, tel_mesa = ?, img_mesa = ? WHERE id_mesa = ?`,
        [tipo_mesa, precio_mesa, descrip_mesa, contact_mesa, tel_mesa, req.file ? req.file.path : null, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la mesa');
                return;
            }
            res.send({ message: 'Mesa actualizada exitosamente' });
        });
}

module.exports = { getTables, insertTable, deleteTable, updateTable,getTablesById };
