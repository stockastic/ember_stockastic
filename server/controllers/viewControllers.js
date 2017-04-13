'use strict';

module.exports = function(app) {

	let db = require('../models/index')(app);
    let env = app.get('env');

    return {
    	renderIndex: wrap(function*(req, resp, next) {
    		resp.render('layout.hbs');
    		next();
    	});
    }
}