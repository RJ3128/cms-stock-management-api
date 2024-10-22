const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware (if needed)
app.use(express.json());

const mongoURI = 'mongodb://cmsadmin:49ysEC9F7Uw@178.128.198.86:27017/cms_stock_database';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});