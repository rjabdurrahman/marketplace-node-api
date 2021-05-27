const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'autoshay-mysql.cilucdyakkvg.us-east-1.rds.amazonaws.com',
    user: 'dfa600',
    password: 'dfa600',
    database: 'DFA_lol2'
});

function connectDB() {
    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
}

module.exports = { connection, connectDB };