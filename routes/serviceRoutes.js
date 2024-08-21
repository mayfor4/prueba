const express = require('express');
const { getServices, insertService, deleteService, updateService,getServicesById } = require('../controllers/serviceController');


const router = express.Router();
router.get('/servicios/:id',getServicesById);
router.get('/servicios', getServices);
router.post('/servicios', insertService);
router.delete('/servicios/:id', deleteService);
router.put('/servicios/:id', updateService);

module.exports = router;
