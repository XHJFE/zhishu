let proxy = require('../base_proxy');
let util = require('../../lib/util');
let config = require('../../config.json');
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


module.exports = {
    getCityInfo: getCityInfo
};