import { router } from '../../static/fetch.js';
const app = {
    state: {
        // 用户状态
        userStatus: '',
        // axios取消请求阈值
        source: null,
        // 公共的头
        header: {
            isBoxShdow: true,
            backColor: '',
            isBack: '',
            title: '',
            rightTitle: '',
            router: '',
            gobackfn: null
        },
        device: !(navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Adr") > -1)
    },
    mutations: {
        SETHEADER (state, obj, fn) {
            state.header = obj;
            if (fn) fn();
        },
        SETSOURCE (state, data) {
            state.source = data;
        },
        SETSTATUS (state, status) {
            state.userStatus = status;
        }
    },
    actions: {
        setHeader ({ commit }, obj, fn) {
            commit("SETHEADER", obj, fn);
        },
        setSource ({ commit }, data) {
            commit("SETSOURCE", data);
        },
    }
};

export default app;
