<template>
    <div class="index-page">
        
    </div>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        data () {
            return {
                
            };
        },
        mounted () {
            this.$store.dispatch("setHeader", {
                isBack: "APP|-1",
                title: "盈盈丽人贷",
            });
        },
        methods: {
            
        }
    };
</script>

<style lang="less">
.index-page {
    position: absolute;
    width: 100%;
    top: 0 !important;
    left: 0;
}
</style>
