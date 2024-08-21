const express = require('express');
const { getTables, insertTable, deleteTable, updateTable,getTablesById } = require('../controllers/tableController');
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
router.get('/mesas/:id', getTablesById);
router.get('/mesas', getTables);
router.post('/mesas', upload.single('img_mesa'), insertTable);
router.delete('/mesas/:id', deleteTable);
router.put('/mesas/:id', upload.single('img_mesa'), updateTable);

module.exports = router;
