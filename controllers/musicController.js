const mysqlConnection = require('./mysqlConnection'); // Asegúrate de tener el archivo mysqlConnection.js

// Función para obtener toda la música
function getMusic(req, res) {
    mysqlConnection.query('SELECT * FROM Musica', (err, rows) => {
        if (err) {
            res.status(500).send('Error al obtener la música');
            return;
        }
        res.json(rows);
    });
}

// Función para obtener música por ID
function getMusicById(req, res) {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM Musica WHERE id_music = ?', [id], (err, row) => {
        if (err) {
            res.status(500).send('Error al obtener la música');
            return;
        }
        res.json(row[0]); // row[0] porque MySQL devuelve un array de resultados
    });
}

// Función para insertar nueva música  contac_music
function insertMusic(req, res) {
    const { tipo_music, nom_grupo, descrip_music, precio_music, tel_music, contac_music } = req.body;
    const query = `INSERT INTO Musica (tipo_music, nom_grupo, descrip_music, precio_music, tel_music, contac_music) 
                   VALUES (?, ?, ?, ?, ?, ?)`;

    mysqlConnection.query(query, [tipo_music, nom_grupo, descrip_music, precio_music, tel_music, contac_music], (err, result) => {
        if (err) {
            console.error('Error al insertar la música:', err); // Agregado para depuración
            res.status(500).send({ message: 'Error al insertar la música' });
            return;
        }
        res.send({ id: result.insertId, message: 'Música insertada exitosamente' });
    });
}

// Función para eliminar música por ID
function deleteMusic(req, res) {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM Musica WHERE id_music = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send('Error al eliminar la música');
            return;
        }
        res.send({ message: 'Música eliminada exitosamente' });
    });
}

// Función para actualizar música                  
function updateMusic(req, res) {
    const { id } = req.params;
    const { tipo_music, nom_grupo, descrip_music, precio_music, tel_music, contac_music } = req.body;
    const query = `UPDATE Musica 
                   SET tipo_music = ?, nom_grupo = ?, descrip_music = ?, precio_music = ?, tel_music = ?, contac_music = ? 
                   WHERE id_music = ?`;
    mysqlConnection.query(query, [tipo_music, nom_grupo, descrip_music, precio_music, tel_music, contac_music, id], (err, result) => {
        if (err) {
            res.status(500).send('Error al actualizar la música');
            return;
        }
        res.send({ message: 'Música actualizada exitosamente' });
    });
}

module.exports = { getMusic, insertMusic, deleteMusic, updateMusic, getMusicById };
