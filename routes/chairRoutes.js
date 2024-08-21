const express = require('express');
const { getChairs, insertChair, deleteChair, updateChair, getChairsById } = require('../controllers/chairController');
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

router.get('/sillas/:id',getChairsById);
router.get('/sillas', getChairs);
router.post('/sillas', upload.single('img_silla'), insertChair);
router.delete('/sillas/:id', deleteChair);
router.put('/sillas/:id', upload.single('img_silla'), updateChair);

module.exports = router;
