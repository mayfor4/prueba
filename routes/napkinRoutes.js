const express = require('express');
const { getNapkins, insertNapkin, deleteNapkin, updateNapkin, getNapkinsById } = require('../controllers/napkinController');
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
router.get('/napkins/:id',getNapkinsById);
router.get('/napkins', getNapkins);
router.post('/napkins', upload.single('img_servilleta'), insertNapkin);
router.delete('/napkins/:id', deleteNapkin);
router.put('/napkins/:id', upload.single('img_servilleta'), updateNapkin);

module.exports = router;
