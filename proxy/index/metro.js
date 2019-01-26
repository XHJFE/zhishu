let proxy = require('../base_proxy');
let util = require('../../lib/util');
let _ = require('underscore');
let configOpt = require('../../config.json');
let config = configOpt.proxy;
let env = configOpt.base.env;

/**
 * 获取地铁站数据
 * @returns {Promise.<{lpid: string}>}
 */
async function getLine(cityId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/house/findMetros/' + cityId,
        method: 'GET',
        headers: config.headers
    });
    return data;
}

/**
 * 获取涨价数据列表
 * @param cityId 城市ID
 * @param stationId 地铁站ID
 * @returns {Promise.<{lpid: string}>}
 */
async function getUpList(cityId, stationId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/subway/priceUp',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({cityId: cityId, stationId: stationId})
    });
    return data;
}

/**
 * 获取降价数据列表
 * @param cityId 城市ID
 * @param stationId 地铁站ID
 * @returns {Promise.<{lpid: string}>}
 */
async function getDownList(cityId, stationId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/subway/priceDown',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({cityId: cityId, stationId: stationId})
    });
    return data;
}

/**
 * 获取地铁站基本信息
 * @param cityId 城市ID
 * @param stationName 地铁站名称
 * @returns {Promise.<{lpid: string}>}
 */
async function getStationInfo(cityId, stationName) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/subway/findStationAvgPrice',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({cityId: cityId, stationName: stationName})
    });
    return data;
}

/**
 * 获取地铁站热门信息
 * @param cityId 城市ID
 * @param stationName 地铁站名称
 * @returns {Promise.<{lpid: string}>}
 */
async function getHotStress(cityId, stationName) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/stress/hot',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({cityId: cityId, stationName: stationName})
    });
    return data;
}

module.exports = {
    getLine: getLine,
    getUpList: getUpList,
    getDownList: getDownList,
    getStationInfo: getStationInfo,
    getHotStress: getHotStress
};