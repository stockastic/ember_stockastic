let express = require('express');
let path = require('path');
let fs = require('fs');
let expiry = require('static-expiry');
let hbs = require('express-hbs');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');


let app = express();
let server = require('http').Server(app);

// view engine setup
let staticDir = path.join(__dirname, '/stockastic_client/public');
let viewsDir = __dirname + '/server/views';
let exec = require('child_process').exec;

process.env.NODE_ENV = process.env.NODE_ENV || 'local-dev';
app.set('env', process.env.NODE_ENV);

let config = require('./config.json');
let env = app.get('env') || 'local-dev';
let devEnv = (env === 'local-dev');
let svgBodyParser = require('./server/utils/middleware/svg-body-parser');

app.set('port', config[env].port);
app.engine('hbs', hbs.express3({partialsDir: viewsDir}));

app.set('view engine', 'hbs');
app.set('views', viewsDir);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(svgBodyParser);

process.setMaxListeners(20);

app.use(expiry(app, {dir: staticDir, debug: devEnv}));
app.use(express.static(staticDir));
hbs.registerHelper('furl', function(url){ return app.locals.furl(url); });
require('./server/routes/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


process.on('uncaughtException', function(err) {
    logger.error('Stockastic:uncaughtException:' + err.stack);
    throw err;
});

exec('mkdir tmp', function() {
    require('./server/utils/services/clean-up-service')(app).startService();
    server.listen(app.get('port'), function(){
        console.log('Add-on server running at http://' + os.hostname() + ':' + app.get('port'));
    });
});
