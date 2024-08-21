const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { insertCotizacion } = require('./db');

// Normaliza el campo a un array
function normalizeArray(value) {
    if (Array.isArray(value)) {
        return value;
    }
    return value ? [value] : [];
}

function generarPDF(data, callback) {
    const doc = new PDFDocument();
    const pdfPath = path.join(__dirname, 'cotizacion.pdf');
    const stream = fs.createWriteStream(pdfPath);

    doc.pipe(stream);

    doc.fontSize(25).text('Cotización', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Nombre del cliente: ${data.nomcliente || ''}`);
    doc.text(`Teléfono del cliente: ${data.telcliente || ''}`);
    
    doc.text(`Número de personas: ${data.numPersonas || ''}`);
    doc.text(`Número de personas menores: ${data.numPersonasMenor || ''}`);
    doc.text(`Presupuesto: ${data.presupuesto || ''}`);

    // Normalización y manejo de arrays
    doc.text(`Tipo de evento: ${normalizeArray(data.tipoEvento).join(', ')}`);
    doc.text(`Lugar: ${data.lugar || ''}`);
    doc.text(`Zona: ${data.zona || ''}`);
    doc.text(`Comida: ${normalizeArray(data.comida).join(', ')}`);
    doc.text(`Música: ${normalizeArray(data.musica).join(', ')}`);
    doc.text(`Servicios: ${normalizeArray(data.servicios).join(', ')}`);
    doc.text(`Mobiliario de mesas: ${normalizeArray(data.mesas).join(', ')}`);
    doc.text(`Mobiliario de mantelería: ${normalizeArray(data.manteleria).join(', ')}`);
    doc.text(`Mobiliario de sillas: ${normalizeArray(data.sillas).join(', ')}`);
    doc.text(`Mobiliario de otros: ${normalizeArray(data.otros).join(', ')}`);
    doc.text(`Decoración: ${normalizeArray(data.decoracion).join(', ')}`);
    doc.text(`Centros de mesa: ${normalizeArray(data.centrosMesa).join(', ')}`);
    doc.text(`Loza: ${normalizeArray(data.loza).join(', ')}`);
    doc.text(`Plaque: ${normalizeArray(data.plaque).join(', ')}`);
    doc.text(`Vaso: ${normalizeArray(data.vaso).join(', ')}`);
    doc.text(`Copa: ${normalizeArray(data.copa).join(', ')}`);
    doc.text(`Servilletas: ${normalizeArray(data.servilletas).join(', ')}`);
    doc.text(`Adicionales de coctelería: ${normalizeArray(data.cocteleria).join(', ')}`);
    doc.text(`Adicionales de postres: ${normalizeArray(data.postres).join(', ')}`);
    doc.text(`Adicionales de fotos: ${normalizeArray(data.fotos).join(', ')}`);
    doc.text(`Adicionales de diversión: ${normalizeArray(data.diversion).join(', ')}`);
    doc.text(`Adicionales de extras: ${normalizeArray(data.extras).join(', ')}`);

    doc.end();

    stream.on('finish', () => {
        // Insertar en la base de datos
        insertCotizacion(data, (err, id) => {
            if (err) {
                callback(err);
            } else {
                callback(null, pdfPath);
            }
        });
    });

    stream.on('error', (err) => {
        callback(err);
    });
}

module.exports = { generarPDF };
