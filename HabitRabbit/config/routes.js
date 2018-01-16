var home      = require('../app/controllers/home'),
    habit     = require('../app/controllers/habit');

module.exports = function (app, passport) {

    var loggedIn = (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    }

    app.get('/', home.index)
    app.get('/reg*sters?', home.register)
    app.get('/logi?o?ns?', home.login)
    app.get('/dashboards?', loggedIn, home.dashboard)
    app.get('/analy?i?tics?', loggedIn, home.analytics)
    app.get('/soci?j?als?', loggedIn, home.social)
    app.get('/profiles?', loggedIn, home.profile)
    
    app.get('/logout', (req, res) => {
        req.logout()
        req.session.destroy(() => {
            res.clearCookie('connect.sid')
            res.redirect('/')
        })
    })

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to home
        failureRedirect: '/register', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard', // redirect to the secure dashboard section
        failureRedirect: '/login', // redirect back to the login page if there is an error
        failureFlash: true // allow flash messages
    }));

    // habit.js
    app.get('/dashboard/get', loggedIn, habit.get);
    app.post('/dashboard/add', loggedIn, habit.add); // add a habit.
    app.post('/dashboard/edit', loggedIn, habit.edit); // edit a habit.
    app.post('/dashboard/delete', loggedIn, habit.delete); // delete a habit.
}
