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

module.exports = {
    getRatio:getRatio,
    getRatioH:getRatioH
};