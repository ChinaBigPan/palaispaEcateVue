<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    @import "../../common/stylus/variable.styl"

    .side-nav-wrapper
        display flex
        flex-direction column
        width 60px
        height 100%
        #side-nav 
            // width 44px
            height 100%
            position relative
            text-align center
            color $white
            background $palaispa-lightorange
            display flex
            flex-direction column
            img
                width 50px
                height 50px
                margin 10px auto
                animation infiniteRotate 20000ms infinite linear 
            .nav-list
                height 100%
                display flex
                flex-direction column
                background $palaispa-lightorange
                align-items center
                overflow hidden
                li 
                    // width 100%
                    flex 1
                    display flex
                    align-items center
                    text-align center
                    align-self center
                    font-size 18px
                    font-weight bold
                    line-height 1.5
                    
                    i 
                        font-size 30px  
                    &.router-link-active
                        transition 100ms transform linear 
                        color $palaispa-blue
                        transform scale(1.1);

    // 旋转动画
    @keyframes infiniteRotate
        0% 
            transform: rotate(0deg)
        100% 
            transform: rotate(360deg)

</style>

<template>
    <nav class="side-nav-wrapper">
        <section id="side-nav">
            <img @click="clickLogo" :src="logo"></img>
            <ul class="nav-list">
                <router-link tag="li" :to="{name: 'main'}">
                    <div><i class="icon-wxbzhuye"></i><br />首页</div>
                </router-link>
                <router-link tag="li" :to="{name: 'treatment'}">
                    <div><i class="icon-buzou"></i><br />护理</div>
                </router-link>
                <router-link tag="li" :to="{name: 'enrollment'}">
                    <div><i class="icon-ruhui"></i><br />入会</div>
                </router-link>
                <router-link tag="li" :to="{name: 'palaispastore'}">
                    <div><i class="icon-store"></i><br />门店</div>
                </router-link>
            </ul>
        </section>
    </nav>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'tabNav',
    data() {
        return {
            logo: require("../../common/images/Palalogo.png"),
            tabIcon: ["icon-wxbzhuye", "icon-buzou", "icon-ruhui", "icon-good"],
            tabContent: ["首页", "护理", "入会", "门店"]
        }
    },
    methods: {
        // 点击logo跳到主页
        clickLogo() {
            this.$router.push({
                name: "main"
            })
        }
    }
};
</script>