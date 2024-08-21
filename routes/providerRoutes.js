const express = require('express');
const { getProviders, insertProvider, deleteProvider, updateProvider,getProviderById } = require('../controllers/providerController');

const router = express.Router();

router.get('/proveedores', getProviders);
router.get('/proveedores/:id', getProviderById);
router.post('/proveedores', insertProvider);
router.delete('/proveedores/:id', deleteProvider);
router.put('/proveedores/:id', updateProvider);

module.exports = router; 
