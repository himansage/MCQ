const express = require('express');
const router = express.Router();

/* GET questions listing. */
router.get('/', function(req, res, next) {
    res.send('questions list');
});

module.exports = router;
