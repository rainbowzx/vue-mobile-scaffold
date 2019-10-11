// 配置选项
module.exports = [
    {
        type: "confirm",
        name: "vuex",
        message: "是否使用vuex？"
    }, 
    {
        type: "confirm",
        name: "vuexlocal",
        message: "是否使用vuex本地化？",
        when: function (answers) {
            return answers.vuex;
        }
    },
];
