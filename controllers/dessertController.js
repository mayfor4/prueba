const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")

function getDesserts(req, res) {
    db.all('SELECT * FROM Postres', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los postres');
            return;
        }
        res.json(rows);
    });
}

function getDessertsById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM  Postres WHERE id_postre = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener postres ');
            return;
        }
        res.json(row);
    });
}




function insertDessert(req, res) {
    const { tipo_postre, descrip_postre, precio_postre, contact_postre, tel_postre } = req.body;
    db.run(`INSERT INTO Postres (tipo_postre, descrip_postre, precio_postre, contact_postre, tel_postre) VALUES (?, ?, ?, ?, ?)`,
        [tipo_postre, descrip_postre, precio_postre, contact_postre, tel_postre], function(err) {
            if (err) {
                res.status(500).send('Error al insertar el postre');
                return;
            }
            res.send({ id: this.lastID, message: 'Postre insertado exitosamente' });
        });
}

function deleteDessert(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Postres WHERE id_postre = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el postre');
            return;
        }
        res.send({ message: 'Postre eliminado exitosamente' });
    });
}

function updateDessert(req, res) {
    const { id } = req.params;
    const { tipo_postre, descrip_postre, precio_postre, contact_postre, tel_postre } = req.body;
    db.run(`UPDATE Postres SET tipo_postre = ?, descrip_postre = ?, precio_postre = ?, contact_postre = ?, tel_postre = ? WHERE id_postre = ?`,
        [tipo_postre, descrip_postre, precio_postre, contact_postre, tel_postre, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el postre');
                return;
            }
            res.send({ message: 'Postre actualizado exitosamente' });
        });
}

module.exports = { getDesserts, insertDessert, deleteDessert, updateDessert, getDessertsById };
