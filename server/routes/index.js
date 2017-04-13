var models  = require('../models');
var express = require('express');

var router = express.Router();

let viewController = require('./server/controller/viewController.js');

/* GET home page. */
router.get('/', viewController);

module.exports = router;
