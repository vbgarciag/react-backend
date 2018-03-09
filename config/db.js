const mysql = require('mysql');

const cn = mysql.createConnection({
    host        :   'localhost',
    user        :   'root',
    password    :   'secret',
    database    :   'mabe'
})

cn.connect();

module.exports.cn = cn;