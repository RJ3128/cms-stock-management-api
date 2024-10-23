const mongoose = require('mongoose');

const stockItemSchema = new mongoose.Schema({
    regNo: String,
    make: String,
    model: String,
    modelYear: Number,
    kms: Number,
    color: String,
    vin: String,
    retailPrice: Number,
    costPrice: Number,
    accessories: [String],
    images: [String],
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now }
});

const StockItem = mongoose.model('Stock_item', stockItemSchema);

module.exports = StockItem;