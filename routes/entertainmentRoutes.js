const express = require('express');
const { getEntertainment, insertEntertainment, deleteEntertainment, updateEntertainment, getEntertainmentById } = require('../controllers/entertainmentController');

const router = express.Router();

router.get('/diversion/:id',getEntertainmentById );
router.get('/diversion', getEntertainment);
router.post('/diversion', insertEntertainment);
router.delete('/diversion/:id', deleteEntertainment);
router.put('/diversion/:id', updateEntertainment);

module.exports = router;
