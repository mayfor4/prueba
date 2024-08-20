const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\Taven\\eventos.db\\cotizacion.db");
//const db = require('express')().locals.db;

// Función reutilizable para actualizar
function updateRecord(table, columns, values, idColumn, idValue, callback) {
  const setClause = columns.map(col => `${col} = ?`).join(', ');
  const query = `UPDATE ${table} SET ${setClause} WHERE ${idColumn} = ?`;
  
  db.run(query, [...values, idValue], function(err) {
    if (err) {
      console.error(`Error al actualizar en ${table}:`, err);
      return callback(err);
    }
    callback(null, this.changes);
  });
}

module.exports = { updateRecord };