let fs = require("fs");
let path = require('path');
let dir = '../dump/';
let log4js = require('log4js');
log4js.configure(require('../log4js.json'));
let log = log4js.getLogger('dump');

/**
 * dump数据
 * @param data 数据
 * @param filename 文件
 */
function dump(data, filename) {
    fs.writeFile(path.resolve(__dirname + '/' + dir + filename), data, {encoding: 'utf-8'}, function (err, data) {
        if (err) {
            log.error(err.message);
            return;
        }
    });
}

module.exports = {
    dump: dump
};