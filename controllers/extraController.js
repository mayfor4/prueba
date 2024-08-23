const connection = require('./mysqlConnection'); // Importa la conexión MySQL

function getExtras(req, res) {
    connection.query('SELECT * FROM Extras', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los extras');
            return;
        }
        res.json(rows);
    });
}

function getExtrasById(req, res) {
    const { id } = req.params;
    connection.query('SELECT * FROM Extras WHERE id_extra = ?', [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener el extra');
            return;
        }
        res.json(rows[0]);
    });
}



function insertExtra(req, res) {
    const { tipo_extra, descrip_extra, precio_extra, contact_extra, tel_extra } = req.body;

    connection.query(`INSERT INTO Extras (tipo_extra, descrip_extra, precio_extra, contact_extra, tel_extra) VALUES (?, ?, ?, ?, ?)`,
        [tipo_extra, descrip_extra, precio_extra, contact_extra, tel_extra], function(err, results) {
            if (err) {
                console.error('Error al insertar el extra:', err); // Log para depuración
                res.status(500).send('Hubo un problema al agregar el extra');
                return;
            }
            res.send({ id: results.insertId, message: 'Extra insertado exitosamente' });
        });
}






function deleteExtra(req, res) {
    const { id } = req.params;

    connection.query('DELETE FROM Extras WHERE id_extra = ?', [id], (err) => {
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

    connection.query('UPDATE Extras SET tipo_extra = ?, descrip_extra = ?, precio_extra = ?, contact_extra = ?, tel_extra = ? WHERE id_extra = ?',
        [tipo_extra, descrip_extra, precio_extra, contact_extra, tel_extra, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el extra');
                return;
            }
            res.send({ message: 'Extra actualizado exitosamente' });
        });
}

module.exports = { getExtras, insertExtra, deleteExtra, updateExtra, getExtrasById };
