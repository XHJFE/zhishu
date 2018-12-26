let express = require('express');
let router = express.Router();
let logic = require('../logic/main');

/**
 * get请求代理
 */
router.get('/**', function (req, res, next) {
    logic.apiProxy(req, res, next);
});

/**
 * post请求代理
 */
router.post('/**', function (req, res, next) {
    logic.apiProxy(req, res, next);
});

module.exports = router;