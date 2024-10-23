const express = require('express');
const router = express.Router();
const stockController = require('./stockManagement.controller');

// Route to get all stock items
router.get('/get-all-stock-items', stockController.getAllStockItems);

module.exports = router;