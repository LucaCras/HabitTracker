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
    connection.query('SELECT * FROM HabitRabbit.habits', (err, results) => {
        if(err) {
            console.log(err)
        } else {
            console.log("success");
        }
    })
}

module.exports.add = (req, res) => {
    const name = req.body.name;
    const duration = req.body.duration;
    const frequency = req.body.frequency;
    const good = req.body.good;
    connection.query('INSERT INTO HabitRabbit.habits (name, duration, frequency, good) VALUES (?, ?, ?, ?)', [name, duration, frequency, good], (err) => {
        if(err) {
            console.log(err)
        }
    })
}

module.exports.edit = (req, res) => {
    const name = req.body.name;
    const duration = req.body.duration;
    const frequency = req.body.frequency;
    const good = req.body.good;
    const id = req.body.id;
    connection.query('UPDATE HabitRabbit.habits SET name = ?, duration = ?, frequency = ?, good = ? WHERE habit_id = ?', [name, duration, frequency, good, id], (err) => {
        if (err) {
            console.log(err);
        }
    })
}

module.exports.delete = (req, res) => {
    connection.query('DELETE FROM HabitRabbit.habits WHERE habit_id = ?', req.body.id, (err, rows) => {
        if (err) {
            console.log(err);
        }
    })
}
