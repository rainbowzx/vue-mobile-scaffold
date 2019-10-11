<template>
    <button :style="buttonStyle" :class="classLab" :disabled="disabled">
        <slot>{{ text }}</slot>
    </button>
</template>
<script>
/**
 * text:按钮文本信息
 * plain:边框空心按钮
 * fill:实心渐变按钮
 * disabled:按钮是否可用
 * classes:输入样式
 * gradients渐变:['blue','red']
 * size:
 *     small:width: 690px;
 *     normal:width: 330px;
 *     large: width: 200px;height: 60px;font-size: 24px;
 */
    export default {
        props: {
            text: {
                type: String,
                default: null
            },
            plain: {
                type: Boolean,
                default: false
            },
            fill: {
                type: Boolean,
                default: false
            },
            disabled: Boolean,
            classes: {
                type: String,
                default: null
            },
            gradients: {
                type: Array,
                validator: function (val) {
                    return val.length === 2;
                }
            },
            size: {
                type: String,
                default: "normal",
                validator (value) {
                    return ["small", "normal", "large"].indexOf(value) > -1;
                }
            }
        },
        data () {
            return {};
        },
        computed: {
            buttonStyle () {
                if (this.gradients) {
                    return {
                        background: `linear-gradient(90deg, ${this.gradients[0]}, ${
                            this.gradients[1]
                        })`,
                        color: "#FFFFFF"
                    };
                }
            },
            classLab () {
                return [
                    this.classes,
                    "yy_btn",
                    this.plain ? "yy_plain" : "yy_btn_default",
                    this.fill ? "yy_fill" : "yy_btn_default",
                    "yy_btn_" + this.size
                ];
            }
        },
        mounted () {},
        methods: {}
    };
</script>
<style lang="less">
@gradientCl:var(--gradientCl);
@btn_text_color:var(--btnTextCl);
@themCl:var(--themCl);
button {
    &.yy_btn_large {
        width: 690px;
    }
    &.yy_btn_normal {
        width: 260px;
        height: 98px;
        font-size: 36px;
    }
    &.yy_btn_small {
        width: 200px;
        height: 60px;
        font-size: 24px;
    }
}
.yy_btn {
    appearance: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    box-sizing: border-box;
    color: #333;
    color: @btn_text_color;
    &_default {
        appearance: none;
        -moz-user-select: none;
        -khtml-user-select: none;
        user-select: none;
        box-sizing: border-box;
        font-size: 36px;
        width: 330px;
        height: 98px;
        background-color: #fff;
        border: 2PX solid #ccc;
        &:enabled:active {
            background-color: #f7f7f7;
        }
        &[disabled] {
            opacity: 0.3;
        }
    }
}

.yy_plain {
    width: 330px;
    border-width: 1Px;
    border-style: solid;
    border-color: #FF818C;
    border-color: @themCl;
    border-radius: 100px;
    color: #FF818C;
    color: @themCl;
    background-color: #fff;
    &:enabled:active {
        background-color: #f7f7f7;
    }
    &[disabled] {
        opacity: 0.3;
    }
}

.yy_fill {
    border: none;
    width: 330px;
    background: #FF818C;
    background: @themCl;
    color: #fff;
    border-radius: 100px;
    &:enabled:active {
        opacity: 0.6;
    }
    &[disabled] {
        opacity: 0.3;
    }
}
</style>
