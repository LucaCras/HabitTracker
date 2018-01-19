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
    res.render('dashboard', {layout: "app_layout", title: "Dashboard | HabitRabbit", script: "js/dashboard.js", stylesheet: "css/dashboard.css", user: req.user.username})
}

var analytics = (req, res) => {
    res.render('analytics', {layout: "app_layout", title: "Analytics | HabitRabbit", script: "js/analytics.js", stylesheet: "css/analytics.css", user: req.user.username})
}

var social = (req, res) => {
    res.render('social', {layout: "app_layout", title: "Social | HabitRabbit", script: "js/social.js", stylesheet: "css/social.css", user: req.user.username})
}

var profile = (req, res) => {
    res.render('profile', {layout: "app_layout", title: "Profile | HabitRabbit", script: "js/profile.js", stylesheet: "css/profile.css", user: req.user.username})
}

module.exports = {
    index: index,
    register: register,
    login: login,
    dashboard: dashboard,
    analytics: analytics,
    social: social,
    profile: profile
}