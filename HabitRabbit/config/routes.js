var home      = require('../app/controllers/home'),
    dashboard = require('../app/controllers/dashboard'),
    db        = require('./database.js');

//you can include all your controllers

module.exports = function (app, passport) {

    app.get('/login', home.login);
    app.get('/signup', home.home);

    app.get('/', home.loggedIn, home.home); //home
    app.get('/home', home.loggedIn, home.home); //home

    // app.post('/signup', passport.authenticate('local-signup', {
    //     successRedirect: '/home', // redirect to the secure profile section
    //     failureRedirect: '/signup', // redirect back to the signup page if there is an error
    //     failureFlash: true // allow flash messages
    // }));

    // // process the login form
    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect: '/dashboard/', // redirect to the secure profile section
    //     failureRedirect: '/login', // redirect back to the signup page if there is an error
    //     failureFlash: true // allow flash messages
    // }));

    // log out
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })

    // get habits from the database
    app.get('/dashboard/habits', dashboard.habits);

    // dashboard page
    app.get('/dashboard/:user', dashboard.loggedIn, dashboard.dashboard);
    app.post('/dashboard/:user/:update', dashboard.add); // add / edit / delete a habit.

    // more to be added later



}
