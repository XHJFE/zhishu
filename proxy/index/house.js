let proxy = require('../base_proxy');
let util = require('../../lib/util');
let _ = require('underscore');
let configOpt = require('../../config.json');
let config = configOpt.proxy;
let env = configOpt.base.env;

/**
 * 获取城市基础信息
 * @param cityId 城市ID
 * @param stressId 小区ID
 * @returns {Promise.<*>}
 */
async function getCityInfo(cityId, stressId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/stress/find',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({cityId: cityId, stressId: stressId})
    });
    return data;
}

/**
 * 根据城市获取查阅次数
 * @returns {Promise.<void>}
 */
async function getViewNum() {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/record/findSearchCount',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({type: "STRESS"})
    });
    return data;
}

/**
 * 获取附近小区
 * @param stressId 小区ID
 * @param shopMapId 商圈ID
 * @returns {Promise.<void>}
 */
async function getNearStress(stressId, shopMapId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/stress/findNearbyStress',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({stressId: stressId, shopMapId: shopMapId, size: 4})
    });
    return data;
}

/**
 * 获取小区附近二手房、租房
 * @param stressId 小区ID
 * @param type 类型, 11为二手房， 12 租房
 * @returns {Promise.<*>}
 */
async function getNearHouse(stressId, type) {
    let data = await proxy({
        // uri: config.base_server_url[env] + '/web/housePrice/stress/findNearbyHouse',
        uri: config.base_server_url[env] + '/web/housePrice/stress/findNearbyHouseFromSo',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({stressId: stressId, houseType: type})
    });
    return data;
}

/**
 * 获取涨价列表
 * @param cityId 城市ID
 * @param areaId 区域ID
 * @param shopMapId 商圈ID
 * @returns {Promise.<*>}
 */
async function getUpList(cityId, areaId, shopMapId) {
    let param = {};
    cityId && (param.cityId = cityId);
    areaId && (param.regionId = areaId);
    shopMapId && (param.shopMapId = shopMapId);

    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/stress/priceUp',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(param)
    });
    return data;
}

/**
 * 获取热搜数据
 * @param limit 条数， 默认 5 条
 * @returns {Promise.<*>}
 */
async function getHotSearch(limit = 5) {
    let param = {type: "STRESS", limit: limit};

    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/record/stress/search',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(param)
    });
    return data;
}

/**
 * 查询小区专家
 * @param  streesId
 * @returns {Promise.<void>}
 */
async function getProfession(stressId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/stress/zhuanjia/' + stressId,
        method: 'GET',
        headers: config.headers
    });
    return data;
}

/**
 * 获取附近热搜小区
 * @param sqid 商圈ID
 * @returns {Promise.<void>}
 */
async function getHotStress(sqid) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/stress/findHotSearchStress',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({shopMapId: sqid})
    });
    return data;
}

/**
 * 获取默认小区
 * @returns {Promise.<{lpid: string}>}
 */
async function getDefaultArea(cityId) {
    let data = await proxy({
        uri: config.base_server_url[env] + '/web/housePrice/record/stress/default',
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({cityId: cityId, type: 'STRESS'})
    });
    return data;
}

module.exports = {
    getCityInfo: getCityInfo,
    getViewNum: getViewNum,
    getDefaultArea: getDefaultArea,
    getProfession: getProfession,
    getNearStress: getNearStress,
    getNearHouse: getNearHouse,
    getUpList: getUpList,
    getHotSearch: getHotSearch,
    getHotStress: getHotStress
};