var connection = require('../../config/database.js')

module.exports.loggedIn = (req, res, next) => {
    if(true) {
        res.render('dashboard', {title: "Dashboard | HabitRabbit", stylesheet: "../css/dashboard.css"})
    } else {
        next()
    }
}
module.exports.dashboard = (req, res) => {
    res.render('index', {title: "Home | HabitRabbit", stylesheet: "../css/index.css"})
}

module.exports.habits = (req, res) => {
    connection.query('SELECT * FROM HabitRabbit.habits', (err, rows) => {
        if(err) {
            console.log(err)
        } else {
            res.json(rows)
        }
    })
}

module.exports.add = (req, res) => {
    connection.query('INSERT INTO HabitRabbit.habits SET ?', req.body, (err, results) => {
        if(err) {
            console.log(err)
        } else {
            console.log(results)
        }
    })



    res.render('dashboard', {title: "Dashboard | HabitRabbit", stylesheet: "../css/dashboard.css"})
}
