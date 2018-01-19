var connection = require('../../config/database.js')

var _getData = (req, res) => {
    var data = {}
    connection.query('SELECT count(*) as total FROM   HabitRabbit.habits WHERE user_id = ? AND good = "true"', [req.user.user_id], function(err, result) {
        if (err)
            console.log(err)
        else 
            data.goodHabits = result[0].total
            console.log(data)
    })
    connection.query('SELECT count(*) as total FROM HabitRabbit.habits WHERE user_id = ? AND good = "false"', [req.user.user_id], function(err, result) {
        if (err)
            console.log(err)
        else 
            data.badHabits = result[0].total
        console.log(data);
        res.send(data);
    })
    // data.totalHabits = data.badHabits + data.goodHabits;
}

module.exports = {
    getData: _getData,
}
