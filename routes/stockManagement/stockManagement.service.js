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

async function getAllStock() {
    try {
        const stockItems = await StockItems.aggregate([
            {
                $lookup: {
                    from: 'stock_images',
                    let: { stockId: { $toString: '$_id' } },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$stockId', '$$stockId']
                                }
                            }
                        }
                    ],
                    as: 'stockImages'
                }
            },
            {
                $lookup: {
                    from: 'accessories',
                    let: { stockId: { $toString: '$_id' } },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ['$stockId', '$$stockId']
                                }
                            }
                        }
                    ],
                    as: 'accessories'
                }
            },
            {
                $addFields: {
                    stockImages: { $arrayElemAt: ['$stockImages', 0] }, // Extract first element
                    accessories: { $arrayElemAt: ['$accessories', 0] }  // Extract first element
                }
            }
        ]);

        return stockItems;

    } catch (err) {
        console.error("Error during aggregation:", err);
        throw (err);
    }
}

module.exports = {
    createStockItem,
    getAllStock
};