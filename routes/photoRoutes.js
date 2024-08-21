const express = require('express');
const { getPhotos, insertPhoto, deletePhoto, updatePhoto,getPhotosById } = require('../controllers/photoController');

const router = express.Router();
router.get('/fotos/:id',getPhotosById);
router.get('/fotos', getPhotos);
router.post('/fotos', insertPhoto);
router.delete('/fotos/:id', deletePhoto);
router.put('/fotos/:id', updatePhoto);

module.exports = router;
