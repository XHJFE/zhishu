let indexDeal = require('../controller/index');
let apiProxyDeal = require('../controller/apiProxy');
let combProxyDeal = require('../controller/comb');
let config = require('../config.json');
let settings = config.siteInfo;
let _ = require('underscore');
let util = require('../lib/util');
let dump = require('../lib/dump');
let tools = require('../lib/templateTool');

let dumpHotList = _.once(function (data) {
    console.log('==================dump hot list========================');
    dump.dump(JSON.stringify(data), 'hot.json');
});
let dumpAreaLineData = _.once(function (data) {
    console.log('==================dump hot area line data========================');
    dump.dump(JSON.stringify(data), 'area_line.json');
});

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
 * 根路由处理器
 * @param req
 * @param res
 * @param next
 */
function root(req, res, next) {
    let cityId = req.cookies.siteid || settings.cityId;
    let stat = new util.statTimeCost();
    indexDeal({cityId: cityId}, function (d) {
        let data = _.extend({}, settings, d);
        // 类型检查型判空重置
        util.resetDataByMap(data, {
            menus: 'array',
            cities: 'array',
            cityUpList: 'array',
            cityDownList: 'array',
            cityInfo: 'array',
            hotList: 'object',
            viewNum: 'object'
        });
        // 降价房源列表进行倒序排列
        if (data.cityDownList && data.cityDownList.length) {
            data.cityDownList = data.cityDownList.sort(function (a, b) {
                return b.ratio - a.ratio;
            });
        }
        // dumpHotList(data.hotList);
        data.tools = tools;
        let areaLineData = getLineDataFromHotList(data.hotList);
        // dumpAreaLineData(areaLineData);
        data.hotAreaLineData = JSON.stringify(areaLineData);
        if (data.viewNum && data.viewNum.status && data.viewNum.status == 200) {
            data.view_num = data.viewNum.data;
        }
        else {
            data.view_num = 1000;
        }
        data.viewNum = null;
        delete data.viewNum;
        console.log("==============Time Cost==============", stat.get());
        res.render('index', data);
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
    apiProxy: apiProxy,
    apiComb: apiComb
};