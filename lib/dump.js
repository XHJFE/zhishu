let fs = require("fs");
let path = require('path');
let dir = '../dump/';
let _ = require('underscore');
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

/**
 * dump生成器
 * @param filename
 */
function createDumpHandler(filename) {
    return _.once(function (data) {
        console.log('==================dump ' + filename + '========================');
        dump(JSON.stringify(data), filename);
    });
}

module.exports = {
    dump: dump,
    createDumpHandler: createDumpHandler
};