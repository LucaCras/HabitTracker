var connection = require('../../config/database.js')

var _get = (req, res) => {
    connection.query('SELECT * FROM HabitRabbit.habits WHERE user_id = ?', req.user.user_id, (err, results) => {
        if(err) {
            console.log('fail')
        } else {
            res.send(results);
        }
    })
}

var _add = (req, res) => {
    const name = req.body.name;
    const duration = req.body.duration;
    const frequency = req.body.frequency;
    const good = req.body.good;
    const user_id = req.user.user_id;
    connection.query('INSERT INTO HabitRabbit.habits (name, duration, frequency, good, user_id) VALUES (?, ?, ?, ?, ?)', [name, duration, frequency, good, user_id], (err) => {
        if(err) {
            console.log(err)
        }
    })
}

var _edit = (req, res) => {
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

var _delete = (req, res) => {
    connection.query('DELETE FROM HabitRabbit.habits WHERE habit_id = ?', req.body.id, (err, rows) => {
        if (err) {
            console.log(err);
        }
    })
}

var _complete = (req, res) => {
    connection.query('UPDATE HabitRabbit.habits SET succesful = succesful + 1, complete = "true" WHERE habit_id = ?', req.body.id, (err, rows) => {
        if (err) {
            console.log(err) 
        }
    })
}

var _reset = (req, res) => {
    connection.query('UPDATE HabitRabbit.habits SET complete = "false"', (err, rows) => {
        if (err) {
            console.log(err) 
        }
        res.end()
    })
}

module.exports = {
    get: _get,
    add: _add,
    edit: _edit,
    delete: _delete,
    complete: _complete,
    reset: _reset
}
