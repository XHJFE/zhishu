let config = require('../config.json');
let settings = config.apiProxy;
let urlList = config.apiList;
let _ = require('underscore');
let util = require('../lib/util');
let proxy = require('../proxy/api/transfer');

/**
 * 获取裁剪URL地址
 * @param url 原始地址
 * @param clipNum 裁剪次数
 */
function getClipUrl(url, clipNum) {
    for (let i = 0; i < clipNum; i++) {
        url = url.substr(0, url.lastIndexOf('/'));
    }
    return url;
}

/**
 * 校验URL是否在api允许列表内
 * @param url
 * @param type
 */
function checkUrl(url, type) {
    let list, maxClipNum = 0, re = /{[^}]+}/g;
    if (type === 'post') {
        return urlList.indexOf(url) > -1;
    }
    if (type === 'get') {
        urlList.map(function (v) {
            let b = v.match(re), len;
            if (b) {
                len = b.length;
                len > maxClipNum && (maxClipNum = len);
            }
        });

        list = urlList.map(function (v) {
            return getClipUrl(v, maxClipNum);
        });

        return list.indexOf(getClipUrl(url, maxClipNum)) > -1;
    }
}

/**
 * Get接口代理
 * @param req
 * @param res
 * @param next
 */
function get(req, res, next) {
    let url = req.path;
    if (checkUrl(url, 'get')) {
        proxy.get({url: url}).then(function (result) {
            res.json(util.getJSON(result));
        });
    } else {
        res.json(_.extend(settings.outOfListBody));
    }
}

/**
 * Post接口代理
 * @param req
 * @param res
 * @param next
 */
function post(req, res, next) {
    let url = req.path;
    if (checkUrl(url, 'post')) {
        proxy.post({url: url, params: req.body}).then(function (result) {
            res.json(util.getJSON(result));
        });
    }
    else {
        res.json(_.extend(settings.outOfListBody));
    }
}

module.exports = {
    get: get,
    post: post
};