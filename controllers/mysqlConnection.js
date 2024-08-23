// mysqlConnection.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'b47m8sppvcxjqxfge9oc-mysql.services.clever-cloud.com', // Dirección del servidor MySQL
    user: 'ud0fzfgmyhvj51ut', // Usuario de la base de datos
    password: 'pGYfwQzSaERsyNLNah84', // Contraseña de la base de datos
    database: 'b47m8sppvcxjqxfge9oc', // Nombre de la base de datos
    port: 3306,
    
});

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a MySQL:', err.stack);
        return;
    }
    console.log('Conexión exitosa a MySQL. ID de conexión:', connection.threadId);
});

module.exports = connection;
