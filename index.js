const express = require('express');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');


const app = express();
const port = 5000;
app.use(express.json());


const musicRoutes = require('./routes/musicRoutes.js');


const authRoutes = require('./routes/authRoutes.js');


// Rutas
app.use('/api/auth', authRoutes);

app.use('/api', musicRoutes);



// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Servir el archivo 'index.html' para cualquier otra solicitud
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,  'index.html'));
});




app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});



























// Ruta para servir la página principal
/*app.get('/', (req, res) => {
  db.all('SELECT tipo_event FROM evento', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener las opciones de eventos');
      return;
    }

    const opciones = rows.map(row => row.tipo_event);
    res.render('seleccion', { opciones });
  });
});*/







