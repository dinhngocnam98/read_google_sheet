const express = require('express');

const readGGSheetController = require('../controllers/readGGSheetController');

const router = express.Router();

router.post('/', readGGSheetController.readDataGGSheet);

module.exports = router;