const express = require('express');
const { getEvents, insertEvent, deleteEvent, updateEvent, getEventsById } = require('../controllers/eventController');

const router = express.Router();

router.get('/eventos/:id',getEventsById);
router.get('/eventos', getEvents);
router.post('/eventos', insertEvent);
router.delete('/eventos/:id', deleteEvent);
router.put('/eventos/:id', updateEvent);

module.exports = router;
 