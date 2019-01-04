let proxy = require('../base_proxy');
let util = require('../../lib/util');
let config = require('../../config.json').proxy;
let env = config.env;

/**
 * 获取城市基础信息
 * @param cityId
 * @returns {Promise.<*>}
 */
async function getCityInfo(cityId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/area/city',
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/json, text/javascript, */*; q=0.01"
        },
        body: JSON.stringify({cityId: cityId})
    });
    return data;
}

/**
 * 根据城市ID获取房价涨幅榜
 * @param cityId 城市ID
 * @returns {Promise.<void>}
 */
async function getUpInfoByCity(cityId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/stress/priceUp',
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/json, text/javascript, */*; q=0.01"
        },
        body: JSON.stringify({cityId: cityId})
    });
    return data;
}

/**
 * 根据城市ID获取房价跌幅榜
 * @param cityId 城市ID
 * @returns {Promise.<*>}
 */
async function getDownInfoByCity(cityId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/stress/priceDown',
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/json, text/javascript, */*; q=0.01"
        },
        body: JSON.stringify({cityId: cityId})
    });
    return data;
}

/**
 * 根据城市ID获取热门楼盘
 * @param cityId
 * @returns {Promise.<*>}
 */
async function getHot(cityId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/stress/hot',
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/json, text/javascript, */*; q=0.01"
        },
        body: JSON.stringify({cityId: cityId})
    });
    return data;
}

/**
 * 根据城市获取查阅次数
 * @param cityId
 * @returns {Promise.<void>}
 */
async function getViewNum(cityId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/record/region/findCount',
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/json, text/javascript, */*; q=0.01"
        },
        body: JSON.stringify({cityId: cityId})
    });
    return data;
}

module.exports = {
    getCityInfo: getCityInfo,
    getUpInfoByCity: getUpInfoByCity,
    getDownInfoByCity: getDownInfoByCity,
    getHot: getHot,
    getViewNum: getViewNum
};