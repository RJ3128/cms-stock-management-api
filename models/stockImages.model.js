const mongoose = require('mongoose');

const stockImageSchema = new mongoose.Schema({
    stockId: { type: String, required: true },
    primaryImage: { type: String },
    frontImage: { type: String },
    sideImage: { type: String },
    backImage: { type: String },
});

const StockImage = mongoose.model('Stock_image', stockImageSchema);

module.exports = StockImage;