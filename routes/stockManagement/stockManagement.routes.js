const express = require('express');
const router = express.Router();
const stockController = require('./stockManagement.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

router.get(
    '/get-all-stock-items',
    //!! Implement Middleware after testing
    // authMiddleware,
    stockController.getAllStockItems
);

module.exports = router;