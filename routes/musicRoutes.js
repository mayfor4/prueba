const express = require('express');
const { getMusic, insertMusic, deleteMusic, updateMusic,getMusicById } = require('../controllers/musicController');

const router = express.Router();

router.get('/musica', getMusic);
router.post('/musica', insertMusic);
router.delete('/musica/:id', deleteMusic);
router.put('/musica/:id', updateMusic);
router.get('/musica/:id', getMusicById);
module.exports = router;
