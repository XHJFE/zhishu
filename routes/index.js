let express = require('express');
let router = express.Router();
let logic = require('../logic/main');

/* GET home page. */
router.get('/', function (req, res, next) {
    logic.root(req, res, next);
});

/**
 * 小区路由
 */
router.get('/house', function (req, res, next) {
    logic.house(req, res, next);
});

/**
 * 地铁路由
 */
router.get('/metro', function (req, res, next) {
    logic.metro(req, res, next);
});

/**
 * 小区PK路由
 */
router.get('/pk', function (req, res, next) {
    logic.housePK(req, res, next);
});

module.exports = router;
