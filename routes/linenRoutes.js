const express = require('express');
const { getLinens, insertLinen, deleteLinen, updateLinen, getLinensById } = require('../controllers/linenController');
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
router.get('/manteleria/:id',getLinensById );
router.get('/manteleria', getLinens);
router.post('/manteleria', upload.single('img_mantel'), insertLinen);
router.delete('/manteleria/:id', deleteLinen);
router.put('/manteleria/:id', upload.single('img_mantel'), updateLinen);

module.exports = router;
