<template>
    <div id="app">
        <xheader id="commonHeader" :style="thtop" :color="color" :is-back="header.isBack" :is-box-shdow="header.isBoxShdow" :is-back-arrow="header.isBackArrow" :back-color="header.backColor" :title="header.title" :right-title="header.rightTitle" :gobackfn="gobackfn" :right-go="header.rightGo" />
         <!-- v-if="!$route.meta.keepAlive" -->
        <transition :name="'slide-'+transitionName">
            <router-view id="scrollView" :class="{'scrollView':!device,'scrollView isIos':device}"/>
        </transition>
        <div :class="{'errorTip':!device,'errorTip isIos':device}" id="netError">
            <div>
                <img :src="noneNet">
                <p class="tip">信号可能跑到火星去啰</p>
                <Xbutton fill style="margin: 0 auto; display: block;" text="刷新试试" @click.native="reload" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        data () {
            return {
                transitionName: "",
                thtop: "",
                noneNet: require("../src/assets/noneNet.png"),
            };
        },
        computed: {
            ...mapState({
                device: state => state.app.device,
                header: state => state.app.header,
                backfn: state => state.app.header.gobackfn,
                color: state => state.app.header.color,
            })
        },
        watch: {
            $route: function (to, from) {
                // 如果isBack为true时，证明是用户点击了回退，执行right动画
                let isBack = this.$router.isBack;
                if (isBack) {
                    this.transitionName = "out";
                } else {
                    this.transitionName = "in";
                }
                // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
                this.$router.isBack = false;
            }
        },
        mounted: function () {
        },
        methods: {
            reload () {
                window.location.reload();
            },
            handleScroll () {
                var scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                this.thtop = "position:absolute; top:" + scrollTop + "px";
            },
            gobackfn () {
                // 判断返回时的联网状态 未联网情况下从vuex里面去取路由地址,userStatus存了用户某种状态下的路由
                if (this.backfn) {
                    this.backfn();
                } else {
                    if (navigator.onLine) {
                        if (this.header.router) {
                            this.$router.isBack = true;
                            this.$router.replace(this.header.router);
                        }
                    } else {
                        this.$router.isBack = true;
                        this.$router.replace(this.userStatus);
                    }
                }
            }
        }
    };
</script>

<style>
.errorTip {
    display: none;
    position: fixed;
    width: 100%;
    left: 0;
    top: 88px;
    bottom: 0;
    background-color: #f3f3f3;
    z-index: 999;
}
.errorTip.isIos{
    top:128px;
    /* bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom); */
    top: calc(88px + constant(safe-area-inset-top));
    top: calc(88px + env(safe-area-inset-top));
}
.errorTip img {
    display: block;
    width: 300px;
    height: 300px;
    margin: 290px auto 20px auto;
}
.errorTip .tip {
    width: 100%;
    text-align: center;
    font-size: 30px;
    color: #5e5e5e;
    margin-bottom: 60px;
}
.bar_op {
    top: 88px !important;
}

#app {
    height: 100%;
    /*overflow: hidden;*/
}
.contentBox {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 100px;
    padding-bottom: 100px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.scrollView {
    position: absolute;
    top: 88px;
    bottom: 0;
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.scrollView.isIos{
    top:128px;
    /* bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom); */
    top: calc(88px + constant(safe-area-inset-top));
    top: calc(88px + env(safe-area-inset-top));
}
</style>
