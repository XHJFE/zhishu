let indexDeal = require('../controller/index');
let settings = require('../settings.json');
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

module.exports = {
    root: root
};