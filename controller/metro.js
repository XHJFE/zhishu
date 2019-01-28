let proxy = require('../proxy/base/header');
let proxyMetro = require('../proxy/index/metro');
let util = require('../lib/util');
let settings = require('../config.json').siteInfo;
let _ = require('underscore');

// let dump = require('../lib/dump');
// let dumpFile = dump.createDumpHandler('metro.json');

function dealMetro(data) {
    var group = {}, result = [];
    data && data.length && data.map(function (v) {
        if (v.xianlu_name) {
            !group[v.xianlu_name] && (group[v.xianlu_name] = []);
            group[v.xianlu_name].push(v);
        }
    });
    for (let k in group) {
        k && group.hasOwnProperty(k) && result.push({
            name: k,
            color: group[k][0] && group[k][0].colour,
            station: group[k]
        });
    }
    result = result.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        else if (a.name < b.name) {
            return -1;
        }
        else {
            return 0;
        }
    });

    return result;
}

module.exports = function (params, cb) {
    let cityId = params.cityId || settings.cityId;
    let keys = ['menus', 'cities', 'baseInfo', 'stationData', 'upData', 'downData'];
    let menus = proxy.getMenus(cityId);
    let cities = proxy.getCity();
    let baseInfo = proxy.getCityInfo(cityId);
    let metro = proxyMetro.getLine(cityId);

    metro.then(function (metroJson) {
        let metroData = util.getJSON(metroJson);
        let metroInfo = dealMetro(metroData); // 整理好的地铁信息
        if (metroInfo && metroInfo.length) {
            let defaultLine = metroInfo[0]; // 默认线路
            let defaultStation = defaultLine.station[0]; // 默认站点
            let dsId = defaultStation.zhanid; // 默认站点ID
            let dsName = defaultStation.zdname; // 默认站点名
            let stationData = proxyMetro.getStationInfo(cityId, dsName);
            let upData = proxyMetro.getUpList(cityId, dsId);
            let downData = proxyMetro.getDownList(cityId, dsId);

            Promise.all([menus, cities, baseInfo, stationData, upData, downData]).then(function (result) {
                cb(_.extend(util.getResult(keys, result), {metroLine: metroData, metroInfo: metroInfo}));
            }).catch(function (e) {
                cb(_.extend(util.getResultError(keys), {metroLine: [], metroInfo: []}));
            });
        }
        else {
            cb(_.extend(util.getResultError(keys), {metroLine: [], metroInfo: []}));
        }
    });
};