const mongoose = require('mongoose');

const stockImageSchema = new mongoose.Schema({
    stockId: { type: String, required: true, unique: true },
    primaryImage: { type: String },
    frontImage: { type: String },
    sideImage: { type: String },
    backImage: { type: String },
});

const StockItem = mongoose.model('Stock_image', stockImageSchema);

module.exports = StockItem;