let proxy = require('../proxy/base/header');
let proxyIndex = require('../proxy/index/index');
let util = require('../lib/util');
let settings = require('../config.json').siteInfo;

module.exports = function (params, cb) {
    let cityId = params.cityId || settings.cityId;
    let keys = ['menus', 'cities', 'cityInfo', 'cityUpList', 'cityDownList', 'hotList', 'viewNum'];
    let menus = proxy.getMenus(cityId);
    let cities = proxy.getCity();
    let cityInfo = proxyIndex.getCityInfo(cityId);
    let cityUpList = proxyIndex.getUpInfoByCity(cityId);
    let cityDownList = proxyIndex.getDownInfoByCity(cityId);
    let hotList = proxyIndex.getHot(cityId);
    let viewNum = proxyIndex.getViewNum(cityId);

    Promise.all([menus, cities, cityInfo, cityUpList, cityDownList, hotList, viewNum]).then(function (result) {
        cb(util.getResult(keys, result));
    }).catch(function (e) {
        cb(util.getResultError(keys));
    });
};