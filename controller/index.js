let proxy = require('../proxy/base/header');
let proxyIndex = require('../proxy/index/index');
let util = require('../lib/util');
// let config = require('../config.json');
let settings = require('../settings.json');

module.exports = function (params, cb) {
    let cityId = params.cityId || settings.cityId;
    let keys = ['menus', 'cities', 'cityInfo'];
    let menus = proxy.getMenus(cityId);
    let cities = proxy.getCity();
    let cityInfo = proxyIndex.getCityInfo(cityId);

    Promise.all([menus, cities, cityInfo]).then(function (result) {
        cb(util.getResult(keys, result));
    }).catch(function (e) {
        cb(util.getResultError(keys));
    });
};