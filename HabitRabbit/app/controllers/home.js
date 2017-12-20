var loggedIn = function(req, res, next) {
    if(req.user) {
        res.render('dashboard', {title: "Dashboard | HabitRabbit", stylesheet: "css/dashboard.css"})
    } else {
        next();
    }
}

var home = function(req, res) {
    res.render('index', {title: "Home | HabitRabbit", stylesheet: "css/index.css"})
}

var login = function(req, res) {
    res.render('login', {title: 'Login | HabitRabbit', stylesheet: "css/login.css"})
}

module.exports = {
    home: home,
    login: login,
    loggedIn: loggedIn
}