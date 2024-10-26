const mongoose = require('mongoose');

const stockItemSchema = new mongoose.Schema({
    regNo: { type: String, required: true, unique: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    modelYear: { type: String, required: true },
    kms: { type: Number, required: true },
    colour: { type: String },
    vin: { type: String, required: true, unique: true },
    retailPrice: { type: Number },
    costPrice: { type: Number },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date, default: Date.now }
});

const StockItem = mongoose.model('Stock_item', stockItemSchema);

module.exports = StockItem;