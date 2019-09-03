let configOpt = require('../config.json');
let baseProxy = require('../proxy/base_proxy');
let util = require('../lib/util');

let config = configOpt.proxy;
let getMobileDomainApi = 'http://console.xhj.com/web/city/findCityByDomain?domain={domain}'


let methods = {
    getMobileDomain: async function (domain) {
        let reqObj = {
            uri: util.format(getMobileDomainApi, { domain: domain }),
            method: "GET",
            headers: config.headers
        };
        let data = await baseProxy(reqObj);
        return data;
    }
};

module.exports = methods;
