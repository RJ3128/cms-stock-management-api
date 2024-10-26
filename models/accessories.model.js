
const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
    stockId: { type: String, required: true, unique: true },
    accessories: { type: String },
});

const Accessories = mongoose.model('Accessories', accessoriesSchema);

module.exports = Accessories;

