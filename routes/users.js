var express = require('express');
var router = express.Router();
var db = require('../config/db.js').cn;

/* GET home page. */
router.get('/users', function(req, res, next) {
    db.query('SELECT * from users LIMIT 10', function (err, rows, fields) {
        if(err) throw err;

        console.log(rows[0].firstname);

        res.json(rows);
    })
});

module.exports = router;
