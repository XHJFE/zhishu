let express = require('express');
let router = express.Router();
let helper = require('../logic/helper');
let util = require('../lib/util');
let config = require('../config.json').base;

router.get('/**', function (req, res, next) {
    let userAgent = req.headers['user-agent'].toLowerCase();
    let isMobile = userAgent.match(/(iphone|ipod|ipad|android)/);
    let host = 'http://' + req.hostname + '/';
    let url = config.root[config.env] + req.originalUrl.substr(1);

    if (isMobile) {
        helper.getMobileDomain(host).then(function (r) {
            if (r) {
                let info = util.getJSON(r);
                if (info && info.wapDomain) {
                    let rUrl = info.wapDomain + (info.wapDomain.substr(info.wapDomain.length - 1) === '/' ? url.substr(1) : url);
                    res.redirect(rUrl);
                }
                else {
                    next();
                }
            }
            else {
                next();
            }
        }).catch(function (e) {
            next();
        });
    }
    else {
        next();
    }
});

module.exports = router;