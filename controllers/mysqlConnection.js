// mysqlConnection.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'bvtec2tprhcndq5n0sjr-mysql.services.clever-cloud.com', // Dirección del servidor MySQL
    user: 'u7ubtfwhu9mdkbee', // Usuario de la base de datos
    password: '8kXOfaM4WKHXuXcAcQnY', // Contraseña de la base de datos
    database: 'bvtec2tprhcndq5n0sjr', // Nombre de la base de datos
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