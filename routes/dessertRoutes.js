const express = require('express');
const { getDesserts, insertDessert, deleteDessert, updateDessert, getDessertsById } = require('../controllers/dessertController');

const router = express.Router();


router.get('/postres/:id',getDessertsById);
router.get('/postres', getDesserts);
router.post('/postres', insertDessert);
router.delete('/postres/:id', deleteDessert);
router.put('/postres/:id', updateDessert);

module.exports = router;
