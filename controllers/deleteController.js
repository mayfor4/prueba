const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\Taven\\eventos.db\\cotizacion.db");

//const db = require('express')().locals.db;

function deleteRecord(table, idColumn, idValue, callback) {
  const query = `DELETE FROM ${table} WHERE ${idColumn} = ?`;
  
  db.run(query, [idValue], function(err) {
    if (err) {
      console.error(`Error al eliminar en ${table}:`, err);
      return callback(err);
    }
    callback(null, this.changes);
  });
}


module.exports = { deleteRecord };