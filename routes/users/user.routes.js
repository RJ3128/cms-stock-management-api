const express = require('express');
const userController = require('./user.controller');
const router = express.Router();
// const stockController = require('./stockManagement.controller');


router.post('/create-user', userController.createUser);
router.post('/authenticate', userController.authenticate);


module.exports = router;