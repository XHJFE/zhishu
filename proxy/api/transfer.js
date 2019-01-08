let proxy = require('../base_proxy');
let util = require('../../lib/util');
let configOpt = require('../../config.json');
let config = configOpt.proxy;
let env = configOpt.base.env;

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
        headers: config.headers
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
        headers: config.headers,
        body: JSON.stringify(opt.params)
    });
    return data;
}

module.exports = {
    get: get,
    post: post
};