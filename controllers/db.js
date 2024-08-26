const mysqlConnection = require('./mysqlConnection');
const fs = require('fs');

const path = require('path');


function insertCotizacion(data, callback) {//27
    const {
        numPersonas, numPersonasMenor, presupuesto, tipoEvento, lugar, zona, comida,
        musica, servicios, mesas, manteleria, sillas, otros, decoracion, centrosMesa,
        loza, plaque, vaso, copa, servilletas, cocteleria, postres, fotos, diversion,
        extras, nomcliente, telcliente
    } = data;

    const query = `INSERT INTO cotizaciones (
        numPersonas, numPersonasMenor, presupuesto, tipoEvento, lugar, zona, comida,
        musica, servicios, mesas, manteleria, sillas, otros, decoracion, centrosMesa,
        loza, plaque, vaso, copa, servilletas, cocteleria, postres, fotos, diversion,
        extras, nomcliente, telcliente
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

    mysqlConnection.query(query, [
        numPersonas, numPersonasMenor, presupuesto, tipoEvento, lugar, zona, comida,
        musica, servicios, mesas, manteleria, sillas, otros, decoracion, centrosMesa,
        loza, plaque, vaso, copa, servilletas, cocteleria, postres, fotos, diversion,
        extras, nomcliente, telcliente
    ], (err, result) => {
        if (err) {
            console.error(`Error al insertar cotización:`,err);
            callback(err);
        } else {
            callback(null, result.insertId);
        }
    });
}

/*function getCotizacion(id, callback) {
    db.get(`SELECT * FROM cotizaciones WHERE id = ?`, [id], (err, row) => {
        callback(err, row);
    });
}*/

function getCotizacion(id, res) {
    mysqlConnection.query(`SELECT * FROM cotizaciones WHERE id = ?`, [id], (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener cotizacion');
            return;
        }
        res.json(rows);
    });
}




module.exports = { insertCotizacion, getCotizacion };
