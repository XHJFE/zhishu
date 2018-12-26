let proxy = require('../base_proxy');
let util = require('../../lib/util');
let config = require('../../config.json').proxy;
let env = config.env;

/**
 * get 请求透传
 * @param opt 参数列表
 * @returns {Promise.<*>}
 */
async function get(opt) {
    "dev" === env && console.log(config.base_server_url[env] + opt.url);
    let data = await proxy({
        uri: config.base_server_url[env] + opt.url,
        method: 'GET',
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/json, text/javascript, */*; q=0.01"
        }
    });
    return data;
}

/**
 * post请求透传
 * @param opt 参数列表
 * @returns {Promise.<*>}
 */
async function post(opt) {
    "dev" === env && console.log(config.base_server_url[env] + opt.url);
    let data = await proxy({
        uri: config.base_server_url[env] + opt.url,
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "application/json, text/javascript, */*; q=0.01"
        },
        body: JSON.stringify(opt.params)
    });
    return data;
}

module.exports = {
    get: get,
    post: post
};