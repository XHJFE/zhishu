let proxy = require('../proxy/base/header');
let proxyHouse = require('../proxy/index/house');
let proxyMetro = require('../proxy/index/metro');
let util = require('../lib/util');
let settings = require('../config.json').siteInfo;
let _ = require('underscore');

module.exports = function (params, cb) {
    let cityId = params.cityId || settings.cityId;
    let keys = ['menus', 'cities', 'baseInfo', 'metroLine', 'viewNum', 'profession', 'nearHouseEsf', 'nearHouseZf', 'nearStress', 'upList', 'hotList', 'hotStress'];
    let getDefaultArea = proxyHouse.getDefaultArea(cityId);
    let menus = proxy.getMenus(cityId);
    let cities = proxy.getCity();
    let baseInfo = proxy.getCityInfo(cityId);
    let metro = proxyMetro.getLine(cityId);

    getDefaultArea.then(function (data) {
        data = util.getJSON(data);
        let lpid = data.lpid;
        let sqid = data.sqid;
        let cityInfo = proxyHouse.getCityInfo(cityId, lpid);
        let viewNum = proxyHouse.getViewNum();
        let profession = proxyHouse.getProfession(lpid);

        let information = {lpid: lpid};
        cityInfo.then(function (cityInfoData) {
            cityInfoData = util.getJSON(cityInfoData);
            let nearHouseEsf = proxyHouse.getNearHouse(lpid, 11);
            let nearHouseZf = proxyHouse.getNearHouse(lpid, 12);
            let nearStress = proxyHouse.getNearStress(lpid, sqid);
            let upList = proxyHouse.getUpList(cityId, null, sqid);
            let hotList = proxyHouse.getHotSearch();
            let hotStress = proxyHouse.getHotStress(cityId);

            Promise.all([menus, cities, baseInfo, metro, viewNum, profession, nearHouseEsf, nearHouseZf, nearStress, upList, hotList, hotStress]).then(function (result) {
                cb(_.extend(util.getResult(keys, result), {cityInfo: cityInfoData}), information);
            }).catch(function (e) {
                cb(_.extend(util.getResultError(keys), {cityInfo: {}}), information);
            });
        });
    });
};