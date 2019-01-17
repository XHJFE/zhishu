let proxy = require('../proxy/base/header');
let proxyIndex = require('../proxy/index/index');
let util = require('../lib/util');
let settings = require('../config.json').siteInfo;

module.exports = function (params, cb) {
    let cityId = params.cityId || settings.cityId;
    let keys = ['menus', 'cities', 'baseInfo'];
    let menus = proxy.getMenus(cityId);
    let cities = proxy.getCity();
    let baseInfo = proxy.getCityInfo(cityId);

    Promise.all([menus, cities, baseInfo]).then(function (result) {
        cb(util.getResult(keys, result));
    }).catch(function (e) {
        cb(util.getResultError(keys));
    });
};