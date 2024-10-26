const StockItem = require('../../models/stockItem.model');
const stockManagementService = require('../stockManagement/stockManagement.service');


async function getAllStock(req, res) {
    try {
        const stockItems = await stockManagementService.getAllStock();
        res.json(stockItems);
    } catch (error) {
        res.json({ message: 'Error fetching stock items', error });
    }
};

async function createStockItem(req, res) {
    try {
        const newStockItem = await stockManagementService.createStockItem(req.body);
        return res.json(newStockItem);
    } catch (error) {
        return res.json({ message: error.message, error });
    }
}

module.exports = {
    getAllStock,
    createStockItem
};