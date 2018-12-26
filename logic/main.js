let indexDeal = require('../controller/index');
let apiProxyDeal = require('../controller/apiProxy');
let config = require('../config.json');
let settings = config.siteInfo;
let _ = require('underscore');
let util = require('../lib/util');

/**
 * 根路由处理器
 * @param req
 * @param res
 * @param next
 */
function root(req, res, next) {
    let cityId = req.cookies.siteid || settings.cityId;
    let stat = new util.statTimeCost();
    indexDeal({cityId: cityId}, function (d) {
        let data = _.extend({}, settings, d);
        console.log(data, stat.get());
        res.render('index', data);
    });
}

/**
 * 接口代理
 * @param req
 * @param res
 * @param next
 */
function apiProxy(req, res, next) {
    let method = req.method.toLowerCase();
    apiProxyDeal[method](req, res, next);
}

module.exports = {
    root: root,
    apiProxy: apiProxy
};