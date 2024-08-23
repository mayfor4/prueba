const mysql = require('mysql');
const connection = require('./mysqlConnection'); // Importa la conexión MySQL

function getProviders(req, res) {
    connection.query('SELECT * FROM Proveedor', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los proveedores');
            return;
        }
        res.json(rows);
    });
}

function getProviderById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Proveedor WHERE id_prov = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener el proveedor');
            return;
        }
        res.json(rows[0]);
    });
}

function insertProvider(req, res) {
    const { nombre_prov, tipo_prov, tel_prov, zona_prov, precio_prov, calif_prov, comment_prov, descrip_prov } = req.body;
    connection.query(
        'INSERT INTO Proveedor (nombre_prov, tipo_prov, tel_prov, zona_prov, precio_prov, calif_prov, comment_prov, descrip_prov) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre_prov, tipo_prov, tel_prov, zona_prov, precio_prov, calif_prov, comment_prov, descrip_prov],
        function(err, results) {
            if (err) {
                res.status(500).send('Error al insertar el proveedor');
                return;
            }
            res.send({ id: results.insertId, message: 'Proveedor insertado exitosamente' });
        }
    );
}

function deleteProvider(req, res) {
    const { id } = req.params;
    connection.query('DELETE FROM Proveedor WHERE id_prov = ?', [id], function(err) {
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
    connection.query(
        'UPDATE Proveedor SET nombre_prov = ?, tipo_prov = ?, tel_prov = ?, zona_prov = ?, precio_prov = ?, calif_prov = ?, comment_prov = ?, descrip_prov = ? WHERE id_prov = ?',
        [nombre_prov, tipo_prov, tel_prov, zona_prov, precio_prov, calif_prov, comment_prov, descrip_prov, id],
        function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el proveedor');
                return;
            }
            res.send({ message: 'Proveedor actualizado exitosamente' });
        }
    );
}

module.exports = { getProviders, insertProvider, deleteProvider, updateProvider, getProviderById };
