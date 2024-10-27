const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sanju@2005',
    database: 'node_ws'
});

connection.connect(function(err) {  
    if (err) {
        console.log(`DB connection error! ${err}`);
    } else {
        console.log('DB connected!');
    }
});

module.exports = {connection};
