const express = require('express');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');


const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/authRoutes.js');
const providerRoutes = require('./routes/providerRoutes.js');
const musicRoutes = require('./routes/musicRoutes.js');
const foodRoutes = require('./routes/foodRoutes.js');
const centerpieceRoutes = require('./routes/centerpieceRoutes');
const decorationRoutes = require('./routes/decorationRoutes');
const tableRoutes = require('./routes/tableRoutes');
const chairRoutes = require('./routes/chairRoutes');
const linenRoutes = require('./routes/linenRoutes');
const otherRoutes = require('./routes/otherRoutes');
const dinnerwareRoutes = require('./routes/dinnerwareRoutes');
const glassesRoutes = require('./routes/glassesRoutes');
const cupRoutes = require('./routes/cupRoutes');
const plaqueRoutes = require('./routes/plaqueRoutes');
const napkinRoutes = require('./routes/napkinRoutes');
const cocktailRoutes = require('./routes/cocktailRoutes');
const dessertRoutes = require('./routes/dessertRoutes');
const photoRoutes = require('./routes/photoRoutes');
const entertainmentRoutes = require('./routes/entertainmentRoutes');
const extraRoutes = require('./routes/extraRoutes');
const placeRoutes = require('./routes/placeRoutes');
const eventRoutes = require('./routes/eventRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const cotizacionRoutes = require('./routes/route');


// Rutas

app.use('/api/auth', authRoutes);
app.use('/api', providerRoutes);
app.use('/api', musicRoutes);
app.use('/api', foodRoutes);
app.use('/api', centerpieceRoutes);
app.use('/api', decorationRoutes);
app.use('/api', tableRoutes);
app.use('/api', chairRoutes);
app.use('/api', linenRoutes);
app.use('/api', otherRoutes);
app.use('/api', dinnerwareRoutes);
app.use('/api', glassesRoutes);
app.use('/api', cupRoutes);
app.use('/api', plaqueRoutes);
app.use('/api', napkinRoutes);
app.use('/api', cocktailRoutes);
app.use('/api', dessertRoutes);
app.use('/api', photoRoutes);
app.use('/api', entertainmentRoutes);
app.use('/api', extraRoutes);
app.use('/api', placeRoutes);
app.use('/api', eventRoutes);
app.use('/api', serviceRoutes);
app.use('/', cotizacionRoutes);



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







