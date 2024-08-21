const express = require('express');
const { getDecorations, insertDecoration, deleteDecoration, updateDecoration,getDecorationsById } = require('../controllers/decorationController');
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

router.get('/decoraciones/:id',getDecorationsById);

router.get('/decoraciones', getDecorations);
router.post('/decoraciones', upload.single('img_dec'), insertDecoration);
router.delete('/decoraciones/:id', deleteDecoration);
router.put('/decoraciones/:id', upload.single('img_dec'), updateDecoration);

module.exports = router;
