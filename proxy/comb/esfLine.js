let proxy = require('../base_proxy');
let util = require('../../lib/util');
let configOpt = require('../../config.json');
let config = configOpt.proxy;
let env = configOpt.base.env;

/**
 * 获取城市折线数据
 * @param cityId 城市ID
 * @returns {Promise.<*>}
 */
async function getLineByCity(cityId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/findCityLine',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({cityId: cityId})
    });
    return data;
}

/**
 * 获取城市和区域折线数据
 * @param cityId 城市ID
 * @param regionId 区域ID
 * @returns {Promise.<*>}
 */
async function getLineByRegion(cityId, regionId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/findRegionLine',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({cityId: cityId, regionId: regionId})
    });
    return data;
}

/**
 * 获取城市和商圈折线数据
 * @param cityId 城市ID
 * @param shopMapId 商圈ID
 * @returns {Promise.<*>}
 */
async function getLineByShop(cityId, shopMapId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/findShopMapLine',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({cityId: cityId, shopMapId: shopMapId})
    });
    return data;
}

module.exports = {
    getLineByCity: getLineByCity,
    getLineByRegion: getLineByRegion,
    getLineByShop: getLineByShop
};