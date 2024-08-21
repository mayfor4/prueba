const express = require('express');
const { getCocktails, insertCocktail, deleteCocktail, updateCocktail,getCocktailsById } = require('../controllers/cocktailController');

const router = express.Router();

router.get('/cocteleria/:id',getCocktailsById);
router.get('/cocteleria', getCocktails);
router.post('/cocteleria', insertCocktail);
router.delete('/cocteleria/:id', deleteCocktail);
router.put('/cocteleria/:id', updateCocktail);

module.exports = router;
