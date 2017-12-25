var LocalStrategy   = require('passport-local').Strategy;

var bcrypt = require('bcryptjs');
var constant = require('../config/constants');
var connection = require('./database.js');  

//expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.user_id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE user_id = ?", id, function(err, result) {	
            if (err) {
                console.log(err);
            } else {
			    done(err, result[0]);
            }
		});
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({ passReqToCallback : true }, 
    function(req, username, password, done) {
        // asynchronous
        process.nextTick(function() {

        // find a user whose username is the same as the forms username
		// we are checking to see if the user trying to login already exists
            connection.query('SELECT * FROM users WHERE username = ?', username, function(err, result) {
                console.log(result);
                if (err)
                    return done(err);
                if (result.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {

                    // if there is no user with that username, create a new user
                    var newUser = {
                        username: username,
                        email: req.body.email
                    }
                    
                    bcrypt.hash(password, 10, function(err, hash) {
                        connection.query('INSERT INTO users ( username, email, password ) values (?, ?, ?)', [username, req.body.email, hash], function(err, result) {
                            newUser.password = hash;
                            newUser.user_id = result.insertId;
                        
                            return done(null, newUser);
                        });	
                    })
                    
                }	
            })
        })
    }))
    
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    
    passport.use('local-login', new LocalStrategy({ passReqToCallback : true },
    function(req, username, password, done) { // callback with email and password from our form

    	
    	
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        connection.query('SELECT * FROM users WHERE username = ?', username, function(err, result) {

            
            // if there are any errors, return the error before anything else
            if (err)
                return done(null, false, req.flash('error', err)); // req.flash is the way to set flashdata using connect-flash


            // if no user is found, return the message
            if (!result.length)
                return done(null, false, req.flash('error', 'Sorry Your Account does not exist, Please Create An Account.')); // req.flash is the way to set flashdata using connect-flash

            
            // if the user is found but the password is wrong
            if (!bcrypt.compareSync(password, result[0].password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata


            return done(null, result[0]);
        });

    }));

};

    
    





