import Vue from 'vue';
import qs from 'qs';
import VueRouter from 'vue-router';
import store from '../store';
import axios from 'axios';
import { AlertModule, LoadingPlugin } from 'vux';
import routers from '../router';
import whitelist from './whitelist';
import { desCode as app } from '../static/encryption.js';
Vue.use(VueRouter);
export const router = new VueRouter(routers);

VueRouter.prototype.goBack = function (num) {
    this.isBack = true;
    window.history.go(num);
};
Vue.use(LoadingPlugin);

// axios 配置
axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = '';
// axios.defaults.baseURL = process.env.BASE_API;
// 存储CancelToken到vuex
store.dispatch('setSource', axios.CancelToken.source());

// http request 拦截器
axios.interceptors.request.use(config => {
    if (!whitelist[qs.parse(config.data).at]) {
        Vue.$vux.loading.show({
            text: '加载中'
        });
    }
    return config;
}, err => {
    Vue.$vux.loading.hide();
    return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
    Vue.$vux.loading.hide();
    if (response.data.timeout) {
        // 接口超时
    }
    // 这里拦截全局的错误信息
    if (response.data && response.data.succ) {
        if (process.env.NODE_ENV != "prod") {
            // 不解密
            response.data.desData && (response.data.desData = JSON.parse(response.data.desData));
        } else {
            // 解密
            response.data.desData && (response.data.desData = JSON.parse(app.decrypted(response.data.desData)));
        }
        return response;
    } else {
        if (response.data && response.data.message) {
            AlertModule.show({
                title: '温馨提示',
                content: response.data.message,
            });
        }
        return response;
    }
}, error => {
    Vue.$vux.loading.hide();
    if (error.message) {
        error = '';
    } else if (JSON.stringify(error).indexOf('Network') != -1) {
        error = '网络异常,请稍后重试~';
    } else if (JSON.stringify(error).indexOf('timeout') != -1) {
        error = '请求超时';
    }
    if (error.response) {
        if (error.response.status !== 200) {
            error = '请检查网络是否已断开';
        }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error);
});
