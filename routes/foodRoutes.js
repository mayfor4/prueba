const express = require('express');
const { getFoods, insertFood, deleteFood, updateFood, getFoodsById } = require('../controllers/foodController');

const router = express.Router();

router.get('/comidas/:id',getFoodsById);
router.get('/comidas', getFoods);
router.post('/comidas', insertFood);
router.delete('/comidas/:id', deleteFood);
router.put('/comidas/:id', updateFood);

module.exports = router;
