var connection = require('../../config/database.js')

module.exports.loggedIn = (req, res, next) => {
    if(true) {
        res.render('dashboard', {title: "Dashboard | HabitRabbit", stylesheet: "../css/dashboard.css", links: ["Dashboard", "Support", "Account"]})
    } else {
        next()
    }
}
module.exports.dashboard = (req, res) => {
    res.render('index', {title: "Home | HabitRabbit", stylesheet: "../css/index.css", links: ["Support", "Login"]})
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
    var values = '("' + req.body.name + '",' + req.body.duration + ',' + req.body.frequency + ',' + req.body.good + ',' + req.body.user + ')';
    connection.query('INSERT INTO HabitRabbit.habits (name, duration, frequency, good, user_id) VALUES ' + values, (err, results) => {
        if(err) {
            console.log(err)
        } else {
            console.log(results)
        }
    })
}

module.exports.edit = (req, res) => {
    console.log("editing is yet to be implemented")
    console.log(req.body);
    connection.query('UPDATE HabitRabbit.habits SET name = ?, duration = ?, frequency = ?, good = ? WHERE habit_id = ?', [req.body.name, req.body.duration, req.body.frequency, req.body.good, req.body.id], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results)
        }
    })
}

module.exports.delete = (req, res) => {
    connection.query('DELETE FROM HabitRabbit.habits WHERE habit_id = ' + req.body.id, (err, rows) => {
        if (err) {
            console.log(err);
        }
    })
}