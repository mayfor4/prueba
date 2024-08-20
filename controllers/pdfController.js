const PDFDocument = require('pdfkit');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database("C:\\Users\\diego\\Documents\\Taven\\eventos.db\\cotizacion.db");
//const db = require('express')().locals.db;

function generarPDF(tipoEvento, clienteId, res) {
  db.get('SELECT * FROM evento WHERE tipo_event = ?', [tipoEvento], (err, evento) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener los datos del evento');
      return;
    }

    if (!evento) {
      res.status(404).send('Evento no encontrado');
      return;
    }

    db.get('SELECT * FROM cliente WHERE id_cli = ?', [clienteId], (err, cliente) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos del cliente');
        return;
      }

      if (!cliente) {
        res.status(404).send('Cliente no encontrado');
        return;
      }

      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=cotizacion-${tipoEvento}.pdf`);

      doc.pipe(res);

      doc.fontSize(20).text('Cotización de Evento', { align: 'center' });
      doc.moveDown();
      doc.fontSize(16).text('Detalles del Evento:', { underline: true });
      doc.moveDown();
      doc.fontSize(12).text(`Tipo de Evento: ${evento.tipo_event}`);
      doc.fontSize(12).text(`Fecha: ${evento.date}`);
      doc.fontSize(12).text(`Número de Adultos: ${evento.adultos}`);
      doc.fontSize(12).text(`Número de Niños: ${evento.niños}`);
      doc.moveDown();
      doc.fontSize(16).text('Detalles del Cliente:', { underline: true });
      doc.fontSize(12).text(`Nombre: ${cliente.nom_cli}`);
      doc.fontSize(12).text(`Teléfono: ${cliente.tel_cli}`);
      doc.fontSize(12).text(`Correo: ${cliente.correo_cli}`);

      doc.end();
    });
  });
}

module.exports = { generarPDF };
