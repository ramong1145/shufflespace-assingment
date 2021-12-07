const express = require('express');
const UserRoutes = express.Router();
const userController = require('../controllers/userController');

UserRoutes.post('/', userController.login);

UserRoutes.post('/create', userController.createUser);

module.exports = UserRoutes;