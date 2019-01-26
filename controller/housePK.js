let proxy = require('../proxy/base/header');
let proxyMetro = require('../proxy/index/metro');
let util = require('../lib/util');
let settings = require('../config.json').siteInfo;

module.exports = function (params, cb) {
    let cityId = params.cityId || settings.cityId;
    let keys = ['menus', 'cities', 'baseInfo', 'metroLine'];
    let menus = proxy.getMenus(cityId);
    let cities = proxy.getCity();
    let baseInfo = proxy.getCityInfo(cityId);
    let metro = proxyMetro.getLine(cityId);

    Promise.all([menus, cities, baseInfo, metro]).then(function (result) {
        cb(util.getResult(keys, result));
    }).catch(function (e) {
        cb(util.getResultError(keys));
    });
};