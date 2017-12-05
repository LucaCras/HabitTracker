const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const app = express();

const exphbs = require('express-handlebars');

var options = {
    dotfiles: 'ignore', etag: false,
    extensions: ['htm', 'html'],
    index: false
};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public'), options));

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.render('index', {title: "Home | HabitRabbit", stylesheets: ["../css/main.css"]})
})

app.get('/login', (req, res) => {
    res.render('login', {title: 'Login | HabitRabbit', stylesheets: ["../css/login.css"]})
})

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username !== 'Luca' || password !== 'password') {
        res.send("No such account found");
    } else {
        res.redirect('/dashboard');
    }
})

app.get('/support', (req, res) => {
    res.render('support', {title: "Support Us | HabitRabbit", stylesheets: []})
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {title: "Dashboard | HabitRabbit", stylesheets: ["../css/dashboard.css  "]});
})




app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
})