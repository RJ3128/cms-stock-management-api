const StockItem = require('../../models/stockItem.model');
const stockManagementService = require('../stockManagement/stockManagement.service');


async function getAllStockItems(req, res) {
    try {
        const stockItems = await StockItem.find();
        res.status(200).json(stockItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stock items', error });
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
    getAllStockItems,
    createStockItem
};