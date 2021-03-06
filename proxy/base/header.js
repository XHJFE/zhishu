let proxy = require('../base_proxy');
let util = require('../../lib/util');
let configOpt = require('../../config.json');
let config = configOpt.proxy;
let env = configOpt.base.env;

/**
 * 获取菜单
 * @param cityId 城市ID
 * @returns {Promise.<*>}
 */
async function getMenus(cityId) {
    let data = await proxy({
        uri: config.proxy_server_url[env] + '/web/channel/siteChannel/' + cityId,
        method: 'GET',
        headers: config.headers
    });
    return data;
}

/**
 * 获取城市
 * @returns {Promise.<*>}
 */
async function getCity() {
    let data = await proxy({
        uri: config.proxy_server_url[env] + '/web/city/findSort',
        method: 'GET',
        headers: config.headers
    });
    return data;
}

/**
 * 获取城市信息
 * @returns {Promise.<*>}
 */
async function getCityInfo(cityId) {
    let data = await proxy({
        uri: config.proxy_server_url[env] + '/web/city/findById/' + cityId,
        method: 'GET',
        headers: config.headers
    });
    return data;
}

module.exports = {
    getMenus: getMenus,
    getCity: getCity,
    getCityInfo: getCityInfo
};