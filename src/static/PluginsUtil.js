import { desCode } from '../static/encryption.js';
export default {
    install (Vue, options) {
        // 全局注册混合对象后，会影响到 所有 之后创建的 Vue 实例。
        // 谨慎使用
        // 号码加星号过滤器
        Vue.filter('toTel', function (str) {
            let start = str.slice(0, 3);
            let end = str.slice(-4);
            return `${start}****${end}`;
        });
        // 3DES加密
        Vue.prototype.encrypted = desCode.encrypted;

        // 3DES解密
        Vue.prototype.decrypted = desCode.decrypted;

        /* 价格数字过滤器 */
        
        Vue.prototype.FormattingNumb = function (s) {
            if (!s) {
                s = '0';
            }
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r;
        };

        // url参数转json
        Vue.prototype.getParams = function (url) {
            try {
                var index = url.indexOf('?');
                url = url.match(/\?([^#]+)/)[1];
                var obj = {}, arr = url.split('&');
                for (var i = 0; i < arr.length; i++) {
                    var subArr = arr[i].split('=');
                    obj[subArr[0]] = subArr[1];
                }
                return obj;
            } catch (err) {
                return null;
            }
        };

        // 去除千分位中的‘,’ 
        Vue.prototype.delcommafy = function (n) {
            n = n.toString().replace(/,/gi, '');
            if (n % 1 === 0) {
                n = parseInt(n);
            }
            return n.toString();
        };
    }
};
