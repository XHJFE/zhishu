let config = require('../config.json');
let settings = config.apiProxy;
let _ = require('underscore');
let util = require('../lib/util');
let proxy = require('../proxy/comb/esfLine');

/**
 * 指令集
 * @type {{getesfline: commander.getesfline}}
 */
let commander = {
    // 获取二手房走势折线数据
    getesfline: function (params, req, res, next) {
        let cityId = req.body.cityId;
        let regionId = req.body.regionId;
        let shopMapId = req.body.shopMapId;

        if (cityId) {
            if (shopMapId) {
                let keys = ['city', 'shop'];
                let city = proxy.getLineByCity(cityId);
                let shop = proxy.getLineByShop(cityId, shopMapId);
                Promise.all([city, shop]).then(function (result) {
                    res.json(_.extend(settings.correctBody, {data: util.getResult(keys, result)}));
                }).catch(function (error) {
                    res.json(_.extend(settings.errorBody, {data: []}));
                });
            }
            else if (regionId) {
                let keys = ['city', 'region'];
                let city = proxy.getLineByCity(cityId);
                let region = proxy.getLineByRegion(cityId, regionId);
                Promise.all([city, region]).then(function (result) {
                    res.json(_.extend(settings.correctBody, {data: util.getResult(keys, result)}));
                }).catch(function (error) {
                    res.json(_.extend(settings.errorBody, {data: []}));
                });
            }
            else {
                let keys = ['city'];
                let city = proxy.getLineByCity(cityId);

                Promise.all([city]).then(function (result) {
                    res.json(_.extend(settings.correctBody, {data: util.getResult(keys, result)}));
                }).catch(function (error) {
                    res.json(_.extend(settings.errorBody, {data: []}));
                });
            }
        }
        else {
            res.json(_.extend(settings.paramError));
        }
    }
};

/**
 * 执行指令
 * @param cmd 指令
 * @param req http请求
 * @param res http响应
 * @param next tick
 */
function cmd(command, req, res, next) {
    if (command.action && command.method && commander.hasOwnProperty(command.method + '_' + command.action)) {
        commander[command.method + '_' + command.action](command, req, res, next);
    }
    else if (command.method && commander.hasOwnProperty(command.method)) {
        commander[command.method](command, req, res, next);
    }
    else {
        res.json(_.extend(settings.errorBody, {data: []}));
    }
}

module.exports = {
    cmd: cmd
};