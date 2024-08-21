const sqlite3 = require('sqlite3').verbose();
const path = require('path');


//const dbPath = path.join(__dirname, 'cotizacion.db');
//const db = new sqlite3.Database(dbPath);
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\ttaven\\cotizaciones.db")
 


function insertCotizacion(data, callback) {
    const {
        numPersonas, numPersonasMenor, presupuesto, tipoEvento, lugar, zona, comida,
        musica, servicios, mesas, manteleria, sillas, otros, decoracion, centrosMesa,
        loza, plaque, vaso, copa, servilletas, cocteleria, postres, fotos, diversion,
        extras, nomcliente, telcliente
    } = data;
    

    /*console.log('Datos a insertar:', {
        numPersonas, numPersonasMenor, presupuesto, tipoEvento, lugar, zona, comida,
        musica, servicios, mesas, manteleria, sillas, otros, decoracion, centrosMesa,
        loza, plaque, vaso, copa, servilletas, cocteleria, postres, fotos, diversion,
        extras, nomcliente, telcliente
    });*/

    const stmt = db.prepare(`INSERT INTO cotizaciones (
        numPersonas, numPersonasMenor, presupuesto, tipoEvento, lugar, zona, comida,
        musica, servicios, mesas, manteleria, sillas, otros, decoracion, centrosMesa,
        loza, plaque, vaso, copa, servilletas, cocteleria, postres, fotos, diversion,
        extras, nomcliente, telcliente
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`);
    
     
    
    stmt.run(
        numPersonas || null, numPersonasMenor || null, presupuesto || null, tipoEvento || null, lugar || null, zona || null, comida || null,
        musica || null, servicios || null, mesas || null, manteleria || null, sillas || null, otros || null, decoracion || null, centrosMesa || null,
        loza || null, plaque || null, vaso || null, copa || null, servilletas || null, cocteleria || null, postres || null, fotos || null, diversion || null,
        extras || null, nomcliente || null, telcliente || null,
        function (err) {
            callback(err, this.lastID);
        }
    );
    stmt.finalize();
}

function getCotizacion(id, callback) {
    db.get(`SELECT * FROM cotizaciones WHERE id = ?`, [id], (err, row) => {
        callback(err, row);
    });
}

module.exports = { insertCotizacion, getCotizacion };
