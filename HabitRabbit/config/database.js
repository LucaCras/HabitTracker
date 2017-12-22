/*************** MySQL configuratrion ********************/
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'wocky',
    database: 'HabitRabbit'
});

connection.connect(err => {
    if (err) {
        throw err;
    } else {
        console.log("MySQL connected succesfully...")
    }
})

module.exports = connection;