/**
 * 获取涨跌幅
 * @param ratio
 */
function getRatio(ratio) {
    if (/[0-9.]+/.test(ratio)) {
        return (ratio - 0).toFixed(2);
    }
    return ratio;
}

/**
 * 获取涨跌幅百分比数
 * @param ratio
 */
function getRatioH(ratio) {
    if (/[0-9.]+/.test(ratio)) {
        return (Math.abs(ratio - 1) * 100).toFixed(2);
    }
    return ratio;
}

/**
 * 获取对象属性
 * @param obj 对象
 * @param pro 属性名
 */
function getProperty(obj, pro) {
    if (obj) {
        if (obj.hasOwnProperty(pro)) {
            return obj[pro];
        }
    }
    return '';
}

/**
 * 获取对象属性(支持分隔符)
 * @param obj 对象
 * @param pro 属性链
 */
function getPro(obj, pro) {
    let proList = pro.split('.'), result = obj;
    try {
        proList.map((p) => {
            result = getProperty(result, p);
        });
    }
    catch (e) {
        result = '';
    }
    return result;
}

/**
 * 分解ratio
 * @param ratio
 */
function splitRatio(ratio) {
    let val, type;
    if (/[0-9.]+/.test(ratio)) {
        ratio -= 0;
        type = ratio >= 1 ? 'add' : 'dec';
        val = Math.abs(1 - ratio).toFixed(2) - 0;
    }
    else {
        val = ratio;
        type = 'add';
    }
    return [val, type];
}

module.exports = {
    getRatio: getRatio,
    getRatioH: getRatioH,
    getProperty: getProperty,
    getPro: getPro,
    splitRatio: splitRatio
};