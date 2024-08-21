const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")

function getProviders(req, res) {
    db.all('SELECT * FROM Proveedor', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los proveedores');
            return;
        }
        res.json(rows);
    }); 
}
function getProviderById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Proveedor WHERE id_prov = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener el proveedor');
            return;
        }
        res.json(row);
    });
}

function insertProvider(req, res) {
    const { nombre_prov, tipo_prov, tel_prov, zona_prov, precio_prov, calif_prov, comment_prov, descrip_prov } = req.body;
    db.run(`INSERT INTO Proveedor (nombre_prov, tipo_prov, tel_prov, zona_prov, precio_prov, calif_prov, comment_prov, descrip_prov) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nombre_prov, tipo_prov, tel_prov, zona_prov, precio_prov, calif_prov, comment_prov, descrip_prov], function(err) {
            if (err) {
                res.status(500).send('Error al insertar el proveedor');
                return;
            }
            res.send({ id: this.lastID, message: 'Proveedor insertado exitosamente' });
        });
}

function deleteProvider(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Proveedor WHERE id_prov = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el proveedor');
            return;
        }
        res.send({ message: 'Proveedor eliminado exitosamente' });
    });
}

function updateProvider(req, res) {
    const { id } = req.params;
    const { nombre_prov, tipo_prov, tel_prov, zona_prov, precio_prov, calif_prov, comment_prov, descrip_prov } = req.body;
    db.run(`UPDATE Proveedor SET nombre_prov = ?, tipo_prov = ?, tel_prov = ?, zona_prov = ?, precio_prov = ?, calif_prov = ?, comment_prov = ?, descrip_prov = ? WHERE id_prov = ?`,
        [nombre_prov, tipo_prov, tel_prov, zona_prov, precio_prov, calif_prov, comment_prov, descrip_prov, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el proveedor');
                return;
            }
            res.send({ message: 'Proveedor actualizado exitosamente' });
        });
}

module.exports = { getProviders, insertProvider, deleteProvider, updateProvider,getProviderById };
