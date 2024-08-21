const express = require('express');
const { getOthers, insertOther, deleteOther, updateOther,getOthersById } = require('../controllers/otherController');
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
router.get('/otros/:id',getOthersById);
router.get('/otros', getOthers);
router.post('/otros', upload.single('img_otro'), insertOther);
router.delete('/otros/:id', deleteOther);
router.put('/otros/:id', upload.single('img_otro'), updateOther);

module.exports = router;
