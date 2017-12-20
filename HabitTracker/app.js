const express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const exphbs = require('express-handlebars');

var options = {
    dotfiles: 'ignore', etag: false,
    extensions: ['htm', 'html'],
    index: false
};

class Habit {
    constructor(name, duration, days, type) {
        this.name = name;
        this.duration = duration;
        this.days = days;
        this.type = type;
        this.succesful = 0;
        this.unsuccesful = 0;
      }
      
      incrementSuccesful(){
        this.succesful += 1;
      }

      incrementUnsuccesful(){
        this.unsuccesful += 1;
      }

      getSuccesRatio(){
        return this.succesful / this.duration;
      }

      static createHabit(name, duration, days, type, id){
        return new Habit(name, duration, days, type, id);
      }
}

app.engine('handlebars', exphbs({defaultLayout: 'main', extname: '.handlebars',
partialsDir : [__dirname + '/views/partials']
,layoutsDir: __dirname + '/views/layouts'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}))

// Static Files Middleware
app.use(express.static(path.join(__dirname, 'public'), options));


// Set port to environment variable, or use port 3000 locally
app.set('port', process.env.PORT || 3000);


// Load in the users database
app.locals.users = require('./database/users.json');
app.locals.habits = require('./database/habits.json')
//set the views directory
app.set('views', path.join(__dirname, 'views/'));

app.get('/', (req, res) => {
    res.render('index', {title: "Home | HabitRabbit", stylesheets: ["css/main.css"]})
})

app.get('/login', (req, res) => {
    res.render('login', {title: 'Login | HabitRabbit', stylesheets: ["../css/login.css"], message: ""})
})

app.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (userAuthentication(username, password)) {
        res.redirect('/dashboard');
    } else {
        res.render('login', { title: 'Login | HabitRabbit', stylesheets: ["../css/login.css"], message: "Login failed!" })
    }
})

app.get('/habits', (req, res) => {
    res.json(app.locals.habits);
})

app.post('/addHabit', (req, res) => {
    Habit.createHabit(req.body.name, req.body.duration, req.body.days, req.body.type, req.body.id)
    var json = JSON.stringify(app.locals.habits)
    console.log(json)
    fs.writeFile('database/habits.json', json, (e) => {
        if(e) {
            return console.log(e);
        }
    })
})

app.get('/support', (req, res) => {
    res.render('support', {title: "Support Us | HabitRabbit", stylesheets: []})
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {title: "Dashboard | HabitRabbit", stylesheets: ["../css/dashboard.css"]});
})

app.get('/users', (req, res) => {
    res.json(app.locals.users)
})


// User Verification
var userAuthentication = (username, password) => {
    var users = app.locals.users.users;
    for (var i = 0; i < users.length; i++) {
        if(users[i].username == username) {
            if (users[i].password == password) {
                console.log("Login succesful");
                return true;
            }
        }
    }
    console.log("Either account does not exist or username & password combo is wrong!");
    return false;
}

app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'));
})

app.use(function (req, res, next) {
    res.status(404);

    if (req.accepts('html')) {
        res.render('404', { url: req.url, title: "404 | HabitRabbit", stylesheets: ["../css/404.css"] });
    }
})