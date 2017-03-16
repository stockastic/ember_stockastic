'use strict';

module.exports = function(req, res, next) {

    if (req.headers['content-type'] && req.headers['content-type'].indexOf('application/svg+xml') !== -1) {

        req.rawSvg = '';

        req.on('data', function(chunk) {
            req.rawSvg += chunk;
        });

        req.on('end', function() {
            next();
        });

        req.on('error', function() {
            response.send(400);
        });
    } else {
        next();
    }
};