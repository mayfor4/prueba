const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")

function getCocktails(req, res) {
    db.all('SELECT * FROM Cocteleria', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los cocteles');
            return;
        }
        res.json(rows);
    });
}

function getCocktailsById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Cocteleria WHERE id_coctel = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener cocteleria ');
            return;
        }
        res.json(row);
    });
}





function insertCocktail(req, res) {
    const { tipo_coctel, descrip_coctel, precio_coctel, contact_coctel, tel_coctel } = req.body;
    db.run(`INSERT INTO Cocteleria (tipo_coctel, descrip_coctel, precio_coctel, contact_coctel, tel_coctel) VALUES (?, ?, ?, ?, ?)`,
        [tipo_coctel, descrip_coctel, precio_coctel, contact_coctel, tel_coctel], function(err) {
            if (err) {
                res.status(500).send('Error al insertar el coctel');
                return;
            }
            res.send({ id: this.lastID, message: 'Coctel insertado exitosamente' });
        });
}

function deleteCocktail(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Cocteleria WHERE id_coctel = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el coctel');
            return;
        }
        res.send({ message: 'Coctel eliminado exitosamente' });
    });
}

function updateCocktail(req, res) {
    const { id } = req.params;
    const { tipo_coctel, descrip_coctel, precio_coctel, contact_coctel, tel_coctel } = req.body;
    db.run(`UPDATE Cocteleria SET tipo_coctel = ?, descrip_coctel = ?, precio_coctel = ?, contact_coctel = ?, tel_coctel = ? WHERE id_coctel = ?`,
        [tipo_coctel, descrip_coctel, precio_coctel, contact_coctel, tel_coctel, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el coctel');
                return;
            }
            res.send({ message: 'Coctel actualizado exitosamente' });
        });
}

module.exports = { getCocktails, insertCocktail, deleteCocktail, updateCocktail, getCocktailsById };
