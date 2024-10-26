const StockItems = require('../../models/stockItem.model');
const StockImages = require('../../models/stockImages.model');
const Accessories = require('../../models/accessories.model');

async function createStockItem(newStock) {

    try {

        const { stockItem, stockImages } = newStock;
        const accessories = stockItem.accessories;

        let newStockItem = new StockItems(stockItem);
        newStockItem = await newStockItem.save();

        const stockItemId = newStockItem._id.toString();
        stockImages.stockId = stockItemId;

        if (stockImages) {
            let newStockImages = new StockImages(stockImages);
            newStockImages = await newStockImages.save();
        }

        if (accessories) {
            const accessoriesObj = {
                stockId: stockItemId,
                accessories: accessories,
            };

            let newAccessories = new Accessories(accessoriesObj);
            newAccessories = await newAccessories.save();
        }
        return newStockItem;

    } catch (err) {
        throw (err);
    }
}

module.exports = {
    createStockItem
};