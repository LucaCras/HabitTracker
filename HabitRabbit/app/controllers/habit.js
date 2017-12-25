var connection = require('../../config/database.js')

var _get = (req, res) => {
    console.log(req.params.user);
    connection.query('SELECT * FROM HabitRabbit.habits', (err, results) => {
        if(err) {
            console.log(err)
        } else {
            console.log('success');
        }
    })
}

var _add = (req, res) => {
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

module.exports = {
    get: _get,
    add: _add,
    edit: _edit,
    delete: _delete
}
