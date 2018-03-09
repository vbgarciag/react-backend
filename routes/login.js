const express = require('express');

const router = express.Router();

router.get('/login', function (req, res, next) {
    res.json({status: true});
})

module.exports = router;