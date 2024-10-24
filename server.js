const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stockRoutes = require('./routes/stockManagement/stockManagement.routes');
const userRoutes = require('./routes/users/user.routes');
require('dotenv').config();

const app = express();
const port = process.env.APP_PORT;
const serverUser = process.env.SERVER_USER;
const serverPassword = process.env.SERVER_PASSWORD;
const serverIp = process.env.SERVER_IP;
const mongoURI = `mongodb://${serverUser}:${serverPassword}@${serverIp}:27017/cms_stock_database`;

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/user', userRoutes);
app.use('/stock-management', stockRoutes);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
