const express = require('express');
const router = express.Router();
const stockController = require('./stockManagement.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.get(
    '/get-all-stock-items',
    authMiddleware,
    stockController.getAllStockItems
);

router.post(
    '/create-stock-item',
    authMiddleware,
    stockController.createStockItem
);

module.exports = router;