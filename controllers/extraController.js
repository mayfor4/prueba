const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")

function getExtras(req, res) {
    db.all('SELECT * FROM Extras', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los extras');
            return;
        }
        res.json(rows);
    });
}

function getExtrasById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Extras WHERE id_extra = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener extras ');
            return;
        }
        res.json(row);
    });
}



function insertExtra(req, res) {
    const { tipo_extra, descrip_extra, precio_extra, contact_extra, tel_extra } = req.body;
    db.run(`INSERT INTO Extras (tipo_extra, descrip_extra, precio_extra, contact_extra, tel_extra) VALUES (?, ?, ?, ?, ?)`,
        [tipo_extra, descrip_extra, precio_extra, contact_extra, tel_extra], function(err) {
            if (err) {
                res.status(500).send('Error al insertar el extra');
                return;
            }
            res.send({ id: this.lastID, message: 'Extra insertado exitosamente' });
        });
}

function deleteExtra(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Extras WHERE id_extra = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el extra');
            return;
        }
        res.send({ message: 'Extra eliminado exitosamente' });
    });
}

function updateExtra(req, res) {
    const { id } = req.params;
    const { tipo_extra, descrip_extra, precio_extra, contact_extra, tel_extra } = req.body;
    db.run(`UPDATE Extras SET tipo_extra = ?, descrip_extra = ?, precio_extra = ?, contact_extra = ?, tel_extra = ? WHERE id_extra = ?`,
        [tipo_extra, descrip_extra, precio_extra, contact_extra, tel_extra, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el extra');
                return;
            }
            res.send({ message: 'Extra actualizado exitosamente' });
        });
}

module.exports = { getExtras, insertExtra, deleteExtra, updateExtra, getExtrasById };
