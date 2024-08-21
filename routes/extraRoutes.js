const express = require('express');
const { getExtras, insertExtra, deleteExtra, updateExtra, getExtrasById } = require('../controllers/extraController');

const router = express.Router();

router.get('/extras/:id',getExtrasById);
router.get('/extras', getExtras);
router.post('/extras', insertExtra);
router.delete('/extras/:id', deleteExtra);
router.put('/extras/:id', updateExtra);

module.exports = router;
