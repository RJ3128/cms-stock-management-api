
const userService = require('./user.service');

async function authenticate(req, res) {
    try {
        const token = await userService.authenticate(req.body);
        res.json({ success: true, token: token, message: 'Success' });
    } catch (error) {
        console.log('ERROR: ', error);
        res.json({ success: false, message: error.message });
    }
}

async function createUser(req, res) {
    try {
        const newUser = await userService.createUser(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
}

async function getUsers(req, res) {
    try {
        const users = await userService.getUsers();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching user', error });
    }
}

async function deleteUser(req, res) {
    try {
        console.log('REQ: ', req.params);
        const deletedUser = await userService.deleteUser(req.params.userId);
        return res.json(deletedUser);
    } catch (error) {
        return res.json({ message: error.message, error });
    }
}


module.exports = {
    createUser,
    authenticate,
    getUsers,
    deleteUser
};