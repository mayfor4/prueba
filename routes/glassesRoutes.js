const express = require('express');
const { getGlasses, insertGlasses, deleteGlasses, updateGlasses, getGlassesById } = require('../controllers/glassesController');
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
router.get('/vasos/:id',getGlassesById);
router.get('/vasos', getGlasses);
router.post('/vasos', upload.single('img_vaso'), insertGlasses);
router.delete('/vasos/:id', deleteGlasses);
router.put('/vasos/:id', upload.single('img_vaso'), updateGlasses);

module.exports = router;
