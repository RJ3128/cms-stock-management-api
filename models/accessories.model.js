
const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
    stockId: { type: String, required: true },
    accessories: { type: String },
});

const Accessories = mongoose.model('Accessories', accessoriesSchema);

module.exports = Accessories;

