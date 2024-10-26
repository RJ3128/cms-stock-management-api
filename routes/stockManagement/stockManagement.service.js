const StockItems = require('../../models/stockItem.model');
const StockImages = require('../../models/stockImages.model');
const Accessories = require('../../models/accessories.model');

async function createStockItem(newStock) {
    const { stockItem, stockImages } = newStock;
    const accessories = stockItem.accessories;

    let newStockItem = new StockItems(stockItem);
    newStockItem = await newStockItem.save();

    const stockItemId = newStockItem._id.toString();
    stockImages.stockId = stockItemId;

    let newStockImages = new StockImages(stockImages);
    newStockImages = await newStockImages.save();

    const accessoriesObj = {
        stockId: stockItemId,
        accessories: accessories,
    };

    let newAccessories = new Accessories(accessoriesObj);
    newAccessories = await newAccessories.save();

    return newStockItem;
}

module.exports = {
    createStockItem
};