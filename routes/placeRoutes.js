const express = require('express');
const { getPlaces, insertPlace, deletePlace, updatePlace, getPlacesById } = require('../controllers/placeController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../frontend/icons'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const router = express.Router();
router.get('/lugares/:id', getPlacesById);
router.get('/lugares', getPlaces);
router.post('/lugares', upload.single('img_lugar'), insertPlace);
router.delete('/lugares/:id', deletePlace);
router.put('/lugares/:id', upload.single('img_lugar'), updatePlace);

module.exports = router;
