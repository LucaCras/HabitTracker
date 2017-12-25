var index = (req, res) => {
    res.render('index', {title: "Home | HabitRabbit", stylesheet: "css/index.css"})
}

var register = (req, res) => {
    res.render('register', {title: "Register | HabitRabbit", stylesheet: "css/register.css"})
}

var login = (req, res) => {
    res.render('login', {title: "Login | HabitRabbit", stylesheet: "css/login.css"})
}

var dashboard = (req, res) => {
    res.render('dashboard', {title: "Dashboard | HabitRabbit", stylesheet: "css/dashboard.css"})
}

var analysis = (req, res) => {
    res.render('analysis', {title: "Analysis | HabitRabbit", stylesheet: "css/analysis.css"})
}

var profile = (req, res) => {
    res.render('profile', {title: "Profile | HabitRabbit", stylesheet: "css/profile.css"})
}

module.exports = {
    index: index,
    register: register,
    login: login,
    dashboard: dashboard,
    analysis: analysis,
    profile: profile
}