let express = require('express');
let router = express.Router();
let logic = require('../logic/main');

/* GET home page. */
router.get('/', function (req, res, next) {
    logic.root(req, res, next);
});

module.exports = router;
