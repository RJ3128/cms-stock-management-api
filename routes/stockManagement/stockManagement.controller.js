const StockItem = require('../../models/stockItem.model');


async function getAllStockItems(req, res) {
    try {
        const stockItems = await StockItem.find();
        res.status(200).json(stockItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stock items', error });
    }
};

module.exports = {
    getAllStockItems
};