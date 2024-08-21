const express = require('express');
const { getCups, insertCup, deleteCup, updateCup,  getCupsById } = require('../controllers/cupController');
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
router.get('/copas/:id',getCupsById);
router.get('/copas', getCups);
router.post('/copas', upload.single('img_copa'), insertCup);
router.delete('/copas/:id', deleteCup);
router.put('/copas/:id', upload.single('img_copa'), updateCup);

module.exports = router;
