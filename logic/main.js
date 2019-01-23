let indexDeal = require('../controller/index');
let metroDeal = require('../controller/metro');
let houseDeal = require('../controller/house');
let housePKDeal = require('../controller/housePK');
let apiProxyDeal = require('../controller/apiProxy');
let combProxyDeal = require('../controller/comb');
let config = require('../config.json');
let settings = config.siteInfo;
let baseInfo = config.base;
let _ = require('underscore');
let util = require('../lib/util');
let dump = require('../lib/dump');
let tools = require('../lib/templateTool');

/**
 * dump生成器
 * @param filename
 */
function createDumpHandler(filename) {
    return _.once(function (data) {
        console.log('==================dump ' + filename + '========================');
        dump.dump(JSON.stringify(data), filename);
    });
}

/**
 * 获取热门小区折线图数据
 * @param data
 */
function getLineDataFromHotList(data) {
    let arr = [];
    if (data.hotStress && data.hotStress.length) {
        data.hotStress.map(function (group) {
            let axisX = [];
            let axisY = [];
            group.map(function (area) {
                axisX.push(area.month);
                axisY.push(area.avg_price);
            });
            arr.push({
                axis: axisX,
                data: axisY
            });
        });
    }
    return arr;
}

/**
 * 重置基础信息
 * @param data
 */
function resetSiteInfo(data) {
    // 重置站点信息
    if (data.baseInfo) {
        data.baseInfo.cityId && (data.cityId = data.baseInfo.cityId);
        data.baseInfo.name && (data.cityName = data.baseInfo.name);
        data.baseInfo.domain && (data.siteDomain = data.baseInfo.domain);
    }
    // 处理域名项
    data.siteDomain = data.siteDomain.replace(/\/+$/, '');
}

/**
 * 挂在插件
 * @param data
 */
function loadPlus(data) {
    tools.isEmpty = util.isEmpty;
    data.tools = tools;
}

/**
 * 抽取对象中的数据
 * @param obj 对象
 * @param pro 属性
 * @param newPro 新属性
 * @param newProDefault 新属性默认值
 */
function pluckData(obj, pro, newPro, newProDefault) {
    if (obj.hasOwnProperty(pro) && obj[pro].status === 200) {
        obj[newPro] = obj[pro].data;
    }
    else {
        obj[newPro] = newProDefault;
    }
    delete obj[pro];
}

let dumpCityInfo = createDumpHandler('cityinfo.json');

/**
 * 根路由处理器
 * @param req
 * @param res
 * @param next
 */
function root(req, res, next) {
    let cityId = req.cookies.siteid || settings.cityId;
    let stat = new util.statTimeCost();
    indexDeal({cityId: cityId}, function (d) {
        let data = _.extend({}, settings, d, baseInfo);
        // 类型检查型判空重置
        util.resetDataByMap(data, {
            menus: 'array',
            cities: 'array',
            baseInfo: 'object',
            cityUpList: 'array',
            cityDownList: 'array',
            cityInfo: 'object',
            hotList: 'object',
            viewNum: 'object'
        });
        // 降价房源列表进行倒序排列
        if (data.cityDownList && data.cityDownList.length) {
            data.cityDownList = data.cityDownList.sort(function (a, b) {
                return b.ratio - a.ratio;
            });
        }

        let areaLineData = getLineDataFromHotList(data.hotList);

        data.hotAreaLineData = JSON.stringify(areaLineData);
        if (data.viewNum && data.viewNum.status && data.viewNum.status == 200) {
            data.view_num = data.viewNum.data;
        }
        else {
            data.view_num = 1000;
        }
        data.viewNum = null;
        delete data.viewNum;
        data.tab_index = 0;
        resetSiteInfo(data);
        loadPlus(data);
        console.log("==============Time Cost==============", stat.get());
        res.render('index', data);
    });
}

/**
 * 小区路由
 * @param req
 * @param res
 * @param next
 */
function house(req, res, next) {
    let cityId = req.cookies.siteid || settings.cityId;
    let stat = new util.statTimeCost();
    houseDeal({cityId: cityId}, function (d, information) {
        let data = _.extend({}, settings, d, information, baseInfo);
        // 类型检查型判空重置
        util.resetDataByMap(data, {
            menus: 'array',
            cities: 'array',
            baseInfo: 'object',
            cityInfo: 'object',
            viewNum: 'array',
            profession: 'object',
            nearHouseEsf: 'object',
            nearHouseZf: 'object',
            nearStress: 'object',
            upList: 'array',
            hotList: 'array'
        });

        data.tab_index = 2;
        // 处理浏览数
        pluckData(data, 'viewNum', 'view_num', 1000);
        // 处理楼盘专家信息
        pluckData(data, 'profession', 'professionInfo', {});
        // 处理二手房、租房、附近小区信息
        pluckData(data, 'nearHouseEsf', 'esf', []);
        pluckData(data, 'nearHouseZf', 'zf', []);
        pluckData(data, 'nearStress', 'stress', []);

        resetSiteInfo(data);
        loadPlus(data);
        // dumpCityInfo(data);
        res.render('house', data);
    });
}

/**
 * 地铁路由
 * @param req
 * @param res
 * @param next
 */
function metro(req, res, next) {
    let cityId = req.cookies.siteid || settings.cityId;
    let stat = new util.statTimeCost();
    metroDeal({cityId: cityId}, function (d) {
        let data = _.extend({}, settings, d, baseInfo);
        // 类型检查型判空重置
        util.resetDataByMap(data, {
            menus: 'array',
            cities: 'array',
            baseInfo: 'object'
        });

        data.tab_index = 1;
        resetSiteInfo(data);
        res.render('metro', data);
    });
}

/**
 * 小区PK路由
 * @param req
 * @param res
 * @param next
 */
function housePK(req, res, next) {
    let cityId = req.cookies.siteid || settings.cityId;
    let stat = new util.statTimeCost();
    housePKDeal({cityId: cityId}, function (d) {
        let data = _.extend({}, settings, d, baseInfo);
        // 类型检查型判空重置
        util.resetDataByMap(data, {
            menus: 'array',
            cities: 'array',
            baseInfo: 'object'
        });

        data.tab_index = 3;
        resetSiteInfo(data);
        res.render('pk', data);
    });
}

/**
 * 接口代理
 * @param req
 * @param res
 * @param next
 */
function apiProxy(req, res, next) {
    let method = req.method.toLowerCase();
    apiProxyDeal[method](req, res, next);
}

/**
 * 合并请求
 * @param req
 * @param res
 * @param next
 */
function apiComb(req, res, next) {
    let method = req.method.toLowerCase();
    combProxyDeal[method](req, res, next);
}

module.exports = {
    root: root,
    house: house,
    metro: metro,
    housePK: housePK,
    apiProxy: apiProxy,
    apiComb: apiComb
};