const express = require('express');
const router = express.Router();
const stockController = require('./stockManagement.controller');


router.get('/get-all-stock-items', stockController.getAllStockItems);

module.exports = router;