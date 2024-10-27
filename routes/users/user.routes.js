const express = require('express');
const userController = require('./user.controller');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth.middleware');

router.post('/authenticate', userController.authenticate);

router.post(
    '/create-user',
    authMiddleware,
    userController.createUser
);

router.get(
    '/get-users',
    authMiddleware,
    userController.getUsers
);

router.delete(
    '/delete-user/:userId',
    authMiddleware,
    userController.deleteUser
);


module.exports = router;