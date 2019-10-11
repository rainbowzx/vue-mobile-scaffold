export default {
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
                 path: '/index',
                 component: resolve => { require(['../views/index.vue'], resolve); },
                 alias: "首页"
             },
             // 默认加载页
             { path: '*', redirect: 'index' }
    ]
};
