const mysqlConnection = require('./mysqlConnection');
const fs = require('fs');

const path = require('path');


function insertCotizacion(data, callback) {
    const {
        numPersonas, numPersonasMenor, presupuesto, tipoEvento, lugar, zona, comida,
        musica, servicios, mesas, manteleria, sillas, otros, decoracion, centrosMesa,
        loza, plaque, vaso, copa, servilletas, cocteleria, postres, fotos, diversion,
        extras, nomcliente, telcliente
    } = data;

    // Verifica que los valores estén siendo recibidos correctamente
    console.log('Datos recibidos:', data);

    const query = `INSERT INTO cotizaciones (
        numPersonas, numPersonasMenor, presupuesto, tipoEvento, lugar, zona, comida,
        musica, servicios, mesas, manteleria, sillas, otros, decoracion, centrosMesa,
        loza, plaque, vaso, copa, servilletas, cocteleria, postres, fotos, diversion,
        extras, nomcliente, telcliente
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;

    mysqlConnection.query(query, [
        numPersonas || null, numPersonasMenor || null, presupuesto || null, tipoEvento || null, lugar || null, zona || null, comida || null,
        musica || null, servicios || null, mesas || null, manteleria || null, sillas || null, otros || null, decoracion || null, centrosMesa || null,
        loza || null, plaque || null, vaso || null, copa || null, servilletas || null, cocteleria || null, postres || null, fotos || null, diversion || null,
        extras || null, nomcliente || null, telcliente || null
    ], (err, result) => {
        if (err) {
            console.error(`Error al insertar cotización:`, err);
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
