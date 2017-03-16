
'use strict';

module.exports = function(app) {
	let viewController = require('../controllers/viewController')(app);

	app.get('/', viewController.renderIndex);
}