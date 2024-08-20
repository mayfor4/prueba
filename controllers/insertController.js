const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\Taven\\eventos.db\\cotizacion.db");
//const db = require('express')().locals.db;

// Función reutilizable para insertar
function insertRecord(table, columns, values, callback) {
  const placeholders = columns.map(() => '?').join(', ');
  const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
  
  db.run(query, values, function(err) {
    if (err) {
      console.error(`Error al insertar en ${table}:`, err);
      return callback(err);
    }
    callback(null, this.lastID);
  });
}

module.exports = { insertRecord };
