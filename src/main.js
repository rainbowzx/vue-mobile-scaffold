import 'babel-polyfill';
import './static/reset.css';
import Vue from 'vue';
import 'lib-flexible';
import {
    router
} from './static/fetch.js';
<% if (vuex) { %> import store from './store'; <% } %>
import FastClick from './static/fastclick.js';
import App from './App.vue';
import Xbutton from './views/components/Xbutton';
import Xheader from './views/components/header';
import PluginsUtil from './static/PluginsUtil.js';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'minirefresh/dist/debug/minirefresh.css';
NProgress.configure({
    showSpinner: false,
    parent: '#scrollView' 
});
Vue.use(Xbutton);
Vue.use(Xheader);
Vue.use(PluginsUtil);

const isDebugMode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebugMode;
Vue.config.devtools = isDebugMode;
Vue.config.productionTip = isDebugMode;

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

const app = new Vue({
    router: router,
    <% if (vuex) { %> store: store, <% } %>
    render: h => h(App)
}).$mount('#app');

// 更改主题色
const urlJson = app.getParams(location.href);
window.localStorage.setItem('__theme', location.href.split('?')[0]);
const dynamicThem = {
    fillBgCl: (urlJson && urlJson.fillBgCl) || null,
    themCl: (urlJson && urlJson.themCl) || null,
    btnTextCl: (urlJson && urlJson.btnTextCl) || null
};
for (var prop in dynamicThem) {
    if (dynamicThem[prop]) {
        document.documentElement.style.setProperty(`--${prop}`, decodeURIComponent(dynamicThem[prop]));
    }
}
/*
监听断网/联网状态
 */
window.addEventListener("offline", function () {
    document.getElementById('netError').style.display = 'block';
    NProgress.remove();
}, false);
window.addEventListener("online", function () {
    document.getElementById('netError').style.display = 'none';
}, false);

router.beforeEach((to, from, next) => {
    store.state.app.source.cancel('请求取消');
    NProgress.start();
    next();
});

router.afterEach((to) => {
    NProgress.done();
});
