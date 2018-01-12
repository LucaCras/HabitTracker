var express = require('express');

var app = express();
var now = new Date();

// Basic dependancies
var constants = require('constants');
var constant = require('./config/constants');
var morgan = require('morgan');
var port = process.env.PORT || 8042;
var path = require('path');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');

// Authentication dependancies
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session');
require('./config/passport')(passport); // pass passport for configuration

// Basic middleware =============================================================
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Views middleware =============================================================
app.use(express.static(path.join(__dirname, 'public'))); // set static folder
app.set('views', path.join(__dirname, 'app/views')); // set views folder
app.engine('hbs', exphbs(
    {
        defaultLayout: 'layout', 
        extname      : '.hbs',
        layoutsDir   :  app.get('views') + '/layouts'
    }
));
app.set('view engine', 'hbs'); // set the view engine to handlebars


// Authentication middleware ====================================================
app.use(cookieParser()); // read cookies (needed for auth)

var sessionStore = new MySQLStore({
    host: 'localhost',
    user: 'root',
    password: 'wocky',
    database: 'HabitRabbit'
})

app.use(session({
    secret: 'I Love Wockies...',
    resave: true,
    store: sessionStore,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
})

// routes ======================================================================
require('./config/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


//launch =======================================================================
app.listen(port, () => { console.log('The magic happens on port ' + port) });


//catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render('404', {title: 'Sorry, page not found', session: req.sessionbo, stylesheet: 'css/404.css'});
});

app.use(function (req, res, next) {
    res.status(500).render('404', {title: 'Sorry, page not found', stylesheet: 'css/404.css'});
});
exports = module.exports = app;