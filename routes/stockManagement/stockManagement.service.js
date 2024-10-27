const StockItems = require('../../models/stockItem.model');
const StockImages = require('../../models/stockImages.model');
const Accessories = require('../../models/accessories.model');

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
                    stockImages: { $arrayElemAt: ['$stockImages', 0] },
                    accessories: { $arrayElemAt: ['$accessories', 0] }
                }
            }
        ]);

        return stockItems;

    } catch (err) {
        console.error("Error during aggregation:", err);
        throw (err);
    }
}

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

async function updateStockItem(payload, stockId) {
    try {
        const newStockItem = payload.stockItem;
        const newStockImages = payload.stockImages;
        const newAccessories = payload.stockItem.accessories;

        let existingStockItem = await StockItems.findById(stockId);
        if (!existingStockItem) {
            throw new Error(`Stock item NOT found.`);
        }


        await StockItems.findByIdAndUpdate(
            stockId,
            newStockItem
        );

        await StockImages.findOneAndUpdate(
            { stockId: stockId },
            newStockImages
        );


        await Accessories.findOneAndUpdate(
            { stockId: stockId.toString() },
            { accessories: newAccessories }
        );

        return {
            success: true
        };

    } catch (err) {
        throw (err);
    }
}

async function deleteStockItem(stockId) {

    console.log('STOCK ID: ', stockId);

    const deletedStockItem = await StockItems.deleteOne({ _id: stockId });

    if (!deletedStockItem) {
        throw new Error('Stock item not found');
    }

    await StockImages.deleteOne(
        { stockId: stockId }
    );

    await Accessories.deleteOne(
        { stockId: stockId },
    );

    return stockId;
}


module.exports = {
    createStockItem,
    getAllStock,
    updateStockItem,
    deleteStockItem
};