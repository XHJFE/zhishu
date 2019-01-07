let logic = require('../logic/comb');

/**
 * 从URL中获取参数
 * @param url
 */
function getParamsFromUrl(url) {
    let urls, cmd, result = {};
    url = url.replace(/^[\/]+|[\/]+$/g, '');
    urls = url.split('/');
    if (cmd = urls.shift()) {
        result.method = cmd.toLowerCase();
    }
    if (cmd = urls.shift()) {
        result.action = cmd.toLowerCase();
    }
    if (urls.length) {
        result.other = urls;
    }
    return result;
}

/**
 * Get接口代理
 * @param req
 * @param res
 * @param next
 */
function get(req, res, next) {
    let url = req.path;
    let params = getParamsFromUrl(url);
    params.type = 'get';
    logic.cmd(params, req, res, next);
}

/**
 * Post接口代理
 * @param req
 * @param res
 * @param next
 */
function post(req, res, next) {
    let url = req.path;
    let params = getParamsFromUrl(url);
    params.type = 'post';
    logic.cmd(params, req, res, next);
}

module.exports = {
    get: get,
    post: post
};