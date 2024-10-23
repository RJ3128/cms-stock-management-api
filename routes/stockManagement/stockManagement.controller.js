const StockItem = require('./stockItem.model');


async function getAllStockItems(req, res) {
    try {
        console.log('THIS FIRES!!!!');
        const stockItems = await StockItem.find();
        console.log('Retrieved Stock Items:', stockItems);
        res.status(200).json(stockItems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stock items', error });
    }
};

module.exports = {
    getAllStockItems
};