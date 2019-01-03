let request = require('request');
let config = require('../config.json').proxy;
let log4js = require('log4js');
log4js.configure(require('../log4js.json'));
let log = log4js.getLogger('proxy');

module.exports = function (opt) {
    !opt.timeout && (opt.timeout = config.timeout);
    return new Promise(function (resolve, reject) {
        request(opt, function (err, response, body) {
            if (err) {
                log.error(err.message);
                resolve({});
            }
            else {
                resolve(body);
            }
        });
    });
};