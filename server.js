const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');
const cors = require('cors');
const stockRoutes = require('./routes/stockManagement/stockManagement.routes');

const app = express();
const port = config.appPort;
const serverUser = config.serverUser;
const serverPassword = config.serverPassword;
const serverIp = config.serverIp;
const mongoURI = `mongodb://${serverUser}:${serverPassword}@${serverIp}:27017/cms_stock_database`;

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/stock-management', stockRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
