const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stockRoutes = require('./routes/stockManagement/stockManagement.routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
const mongoURI = 'mongodb://cmsadmin:49ysEC9F7Uw@178.128.198.86:27017/cms_stock_database';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/stock-management', stockRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
