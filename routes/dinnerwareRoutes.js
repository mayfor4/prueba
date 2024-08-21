const express = require('express');
const { getDinnerware, insertDinnerware, deleteDinnerware, updateDinnerware, getDinnerwareById } = require('../controllers/dinnerwareController');
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

router.get('/loza/:id',getDinnerwareById);
router.get('/loza', getDinnerware);
router.post('/loza', upload.single('img_loza'), insertDinnerware);
router.delete('/loza/:id', deleteDinnerware);
router.put('/loza/:id', upload.single('img_loza'), updateDinnerware);

module.exports = router;
