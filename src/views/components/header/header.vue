<template>
    <header :style="'background:'+backColor" :class="classLab">
        <div class="yy_header_left" @click="goBack">
            <!-- <img v-if="isBackArrow" :src="back" alt=""> -->
            <x-icon class="leftSvg" :style="'fill:'+ color " type="ios-arrow-back" size="25"></x-icon>
        </div>
        <div class="yy_header_middle">
            <span :style="colroStyle" class="oneLineHid">{{ title }}</span>
        </div>
        <div class="yy_header_right" @click="rightEvent">
            <p :style="colroStyle">{{ rightTitle }}</p>
        </div>
    </header>
</template>
<script>
    import { mapState } from "vuex";
    /**
     * backColor:头背景色
     * isBack:([H5|-1]:表示H5的返回方式并向上返回一个页面,[APP|-1]:表示调用APP的返回方式并返回一个页面,默认不传则为null)
     * isBackArrow:是否显示返回箭头
     * isBoxShdow:是否显示header的阴影(默认显示)
     * title:header标题
     * rightTitle:右边按钮文字
     * rightEvent:右边点击事件
     * rightGo:跳转的方向
     * gobackfn: 需要自定义返回时的事件
     * righFn:右边跳转添加自定义方法
     */
    export default {
        props: {
            isBackArrow: {
                type: Boolean,
                default: true
            },
            isBoxShdow: {
                type: Boolean,
                default: true
            },
            backColor: {
                type: String,
                default: "#fff"
            },
            isBack: {
                type: String,
                default: null
            },
            title: {
                type: String,
                default: null
            },
            rightTitle: {
                type: String,
                default: null
            },
            rightGo: {
                type: String,
                default: null
            },
            gobackfn: {
                type: Function
            },
            righFn: {
                type: Function
            },
            color: {
                type: String,
                default: null
            }
        },
        data () {
            return {
                back: require("../../../assets/back.png")
            };
        },
        computed: {
            ...mapState({
                device: state => state.app.device,
            }),
            classLab () {
                return [!this.isBoxShdow ? "boxShadowNone" : null, "yy_header", this.device ? "isIos" : ""];
            },
            colroStyle () {
                return {
                    color: this.color
                };
            }
        },
        created () {
            // 在这里处理去掉原生APP的头部
        },
        methods: {
            goBack () {
                if (!this.isBackArrow) {
                    return;
                }
                if (this.isBack) {
                    if (this.isBack.split("|")[0] === "H5") {
                        this.$router.goBack(this.isBack.split("|")[1]);
                    } else if (this.isBack.split("|")[0] === "APP") {
                        // 原生app返回
                    }
                } else {
                    this.gobackfn();
                }
            },
            rightEvent () {
                if (this.righFn) {
                    this.righFn();
                }
                if (this.rightGo == null || this.rightGo === "") {
                    return;
                }
                if (this.rightGo.indexOf("http://") > -1) {
                    window.location.href = this.rightGo;
                } else {
                    this.$router.push(this.rightGo);
                }
            }
        }
    };
</script>
<style lang="less">
.yy_header {
    transition: all 0.3s;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 499;
    display: flex;
    height:88px;
    align-items: center;
    box-shadow: 0 2px 17px 0 rgba(0, 0, 0, 0.08);
    -webkit-user-select: none;
    user-select: none;
    &.isIos{
        padding-top:40px;
        // height:0;
        // height:calc(88px + 44px);
        padding-top: constant(safe-area-inset-top);
        padding-top: env(safe-area-inset-top);
    }
    &.boxShadowNone {
        box-shadow: none;
    }
    .yy_header_left {
        display: flex;
        flex: 1;
        align-items: center;
        // height: 88px;
        box-sizing: border-box;
        &:active {
            opacity: 0.3;
        }
        img {
            margin-left: 30px;
            width: 48px;
            height: 48px;
            display: block;
        }
    }
    .yy_header_middle {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        height: 88px;
        min-width: 400px;
        span {
            font-size: 36px;
            color: #313131;
        }
    }
    .yy_header_right {
        display: flex;
        flex: 1;
        // height: 88px;
        align-items: center;
        justify-content: flex-end;
        &:active {
            opacity: 0.3;
        }
        p {
            font-size: 32px;
            color: #313131;
            margin-right: 30px;
        }
    }
}
</style>
