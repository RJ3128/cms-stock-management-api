
const userService = require('./user.service');

async function createUser(req, res) {
    try {
        const newUser = await userService.createUser(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
}

async function authenticate(req, res) {
    try {
        const token = await userService.authenticate(req.body);
        res.json({ success: true, token: token, message: 'Success' });
    } catch (error) {
        console.log('ERROR: ', error);
        res.json({ success: false, message: error.message });
    }
}

module.exports = {
    createUser,
    authenticate
};