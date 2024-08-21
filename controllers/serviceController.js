const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\EventosTaven (1).db")

function getServices(req, res) {
    db.all('SELECT * FROM Servicios', [], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener los servicios');
            return;
        }
        res.json(rows);
    });
}

function getServicesById(req, res) {
    const { id } = req.params;
    db.get('SELECT * FROM Servicios WHERE id_service = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener servicios');
            return;
        }
        res.json(row);
    });
}




function insertService(req, res) {
    const { tipo_service, descrip_service, precio_service, contact_service, tel_service } = req.body;
    db.run(`INSERT INTO Servicios (tipo_service, descrip_service, precio_service, contact_service, tel_service) VALUES (?, ?, ?, ?, ?)`,
        [tipo_service, descrip_service, precio_service, contact_service, tel_service], function(err) {
            if (err) {
                res.status(500).send('Error al insertar el servicio');
                return;
            }
            res.send({ id: this.lastID, message: 'Servicio insertado exitosamente' });
        });
}

function deleteService(req, res) {
    const { id } = req.params;
    db.run(`DELETE FROM Servicios WHERE id_service = ?`, [id], function(err) {
        if (err) {
            res.status(500).send('Error al eliminar el servicio');
            return;
        }
        res.send({ message: 'Servicio eliminado exitosamente' });
    });
}

function updateService(req, res) {
    const { id } = req.params;
    const { tipo_service, descrip_service, precio_service, contact_service, tel_service } = req.body;
    db.run(`UPDATE Servicios SET tipo_service = ?, descrip_service = ?, precio_service = ?, contact_service = ?, tel_service = ? WHERE id_service = ?`,
        [tipo_service, descrip_service, precio_service, contact_service, tel_service, id], function(err) {
            if (err) {
                res.status(500).send('Error al actualizar el servicio');
                return;
            }
            res.send({ message: 'Servicio actualizado exitosamente' });
        });
}

module.exports = { getServices, insertService, deleteService, updateService,getServicesById };
