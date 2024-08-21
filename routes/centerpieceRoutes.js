const express = require('express');
const { getCenterpieces, insertCenterpiece, deleteCenterpiece, updateCenterpiece,getCenterpiecesById } = require('../controllers/centerpieceController');
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

router.get('/centros-de-mesa/:id',getCenterpiecesById);
router.get('/centros-de-mesa', getCenterpieces);
router.post('/centros-de-mesa', upload.single('img_cm'), insertCenterpiece);
router.delete('/centros-de-mesa/:id', deleteCenterpiece);
router.put('/centros-de-mesa/:id', upload.single('img_cm'), updateCenterpiece);

module.exports = router;
