const express = require('express');
const { getPlaques, insertPlaque, deletePlaque, updatePlaque,getPlaquesById } = require('../controllers/plaqueController');
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
router.get('/plaques/:id',getPlaquesById);
router.get('/plaques', getPlaques);
router.post('/plaques', upload.single('img_plaque'), insertPlaque);
router.delete('/plaques/:id', deletePlaque);
router.put('/plaques/:id', upload.single('img_plaque'), updatePlaque);

module.exports = router;
