var express = require('express');
var usersController = require('../controllers/usersController');

exports.router = (function(){
    var apiRouter =  express.Router();

    apiRouter.route('/register').post(usersController.register);
    apiRouter.route('/login').post(usersController.login);
    apiRouter.route('/update').put(usersController.updateProfil);
    apiRouter.route('/about').get(usersController.getUserProfile);

    return apiRouter;
})(); 