const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./user.model');
const router = express.Router();
// const stockController = require('./stockManagement.controller');


router.post('/create-user', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: 'User created!' });
    } catch (error) {
        res.status(500).json({ message: 'Could not create user: ', error });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });
    } catch (error) {
        res.status(500).json({ message: 'Could not log in: ', error });
    }
});

// router
//     .route('/:id')
//     .get((req, res) => {

//     })
//     .post((req, res) => {

//     })
//     .put((req, res) => {

//     })
//     .delete((req, res) => {

//     });

// router.param('id', (req, res, next, id) => {
//     // THIS IS MIDDLE WARE
// });

module.exports = router;