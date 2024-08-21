const express = require('express');
const { getMusic, insertMusic, deleteMusic, updateMusic } = require('../controllers/musicController');

const router = express.Router();

router.get('/musica', getMusic);
router.post('/musica', insertMusic);
router.delete('/musica/:id', deleteMusic);
router.put('/musica/:id', updateMusic);

module.exports = router;
