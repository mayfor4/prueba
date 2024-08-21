const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")

function getFoods(req, res) {
    db.all('SELECT * FROM Comida', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener las comidas');
            return;
        }
        res.json(rows);
    });
}

function getFoodsById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Comida WHERE id_comida = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener comida ');
            return;
        }
        res.json(row);
    });
}

function insertFood(req, res) {
    const { tipo_comida, desc_comida, contacto_comida } = req.body;
    db.run(`INSERT INTO Comida (tipo_comida, desc_comida,contacto_comida) VALUES (?, ?,?)`,
        [tipo_comida, desc_comida,contacto_comida], function(err) {
            if (err) {
                res.status(500).send('Error al insertar la comida');
                return;
            }
            res.send({ id: this.lastID, message: 'Comida insertada exitosamente' });
        });
}

function deleteFood(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Comida WHERE id_comida = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar la comida');
            return;
        }
        res.send({ message: 'Comida eliminada exitosamente' });
    });
}

function updateFood(req, res) {
    const { id } = req.params;
    const { tipo_comida, desc_comida,contacto_comida } = req.body;
    db.run(`UPDATE Comida SET tipo_comida = ?, desc_comida = ?, contacto_comida = ? WHERE id_comida = ?`,
        [tipo_comida, desc_comida, contacto_comida, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar la comida');
                return;
            }
            res.send({ message: 'Comida actualizada exitosamente' });
        });
}

module.exports = { getFoods, insertFood, deleteFood, updateFood, getFoodsById };
