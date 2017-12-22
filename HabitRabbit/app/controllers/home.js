var loggedIn = function(req, res, next) {
    if(req.user) {
        res.render('dashboard', {title: "Dashboard | HabitRabbit", stylesheet: "css/dashboard.css", links: ["Dashboard", "Support", "Account"]})
    } else {
        next();
    }
}

var home = function(req, res) {
    res.render('index', {title: "Home | HabitRabbit", stylesheet: "css/index.css", links: ["Support", "Login"]})
}

var login = function(req, res) {
    res.render('login', {title: 'Login | HabitRabbit', stylesheet: "css/login.css", links: ["Support", "Home"]})
}

module.exports = {
    home: home,
    login: login,
    loggedIn: loggedIn
}