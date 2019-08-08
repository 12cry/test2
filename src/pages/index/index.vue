<template>
    <view >
        <uni-grid :column="3" :hor="35" :ver="-45" @change="test">
            <uni-grid-item marker="dot">
                <text class="text">文本</text>
            </uni-grid-item>
            <uni-grid-item marker="badge" text="99" type="success">
                <text class="text">文本</text>
            </uni-grid-item>
            <uni-grid-item marker="image" :hor="35" :ver="-45" :img-width="25" src="https://img-cdn-qiniu.dcloud.net.cn/uni-ui/recommend.png">
                <text class="text">文本</text>
            </uni-grid-item>
        </uni-grid>
        <uni-grid :column="3" :hor="35" :ver="-45">
            <uni-grid-item marker="dot">
                <text class="text">文本</text>
            </uni-grid-item>
            <uni-grid-item marker="badge" text="99" type="success">
                <text class="text">文本</text>
            </uni-grid-item>
            <uni-grid-item marker="image" :hor="35" :ver="-45" :img-width="25" src="https://img-cdn-qiniu.dcloud.net.cn/uni-ui/recommend.png">
                <text class="text">文本</text>
            </uni-grid-item>
        </uni-grid>
        <uni-grid :column="3" :hor="35" :ver="-45">
            <uni-grid-item marker="dot">
                <text class="text">文本</text>
            </uni-grid-item>
            <uni-grid-item marker="badge" text="99" type="success">
                <text class="text">文本</text>
            </uni-grid-item>
            <uni-grid-item marker="image" :hor="35" :ver="-45" :img-width="25" src="https://img-cdn-qiniu.dcloud.net.cn/uni-ui/recommend.png">
                <text class="text">文本</text>
            </uni-grid-item>
        </uni-grid>
    </view>
</template>

<script>
    import {uniGrid ,uniGridItem}from "@dcloudio/uni-ui"
    export default {
        components: {uniGrid,uniGridItem},
        data() {
            return {}
        },
        created() {
        },
        methods: {
            test(event){
                if(event.detail.index==0){
                   uni.navigateTo({
                       url:"/pages/scenery/index"
                   })
                }

            }
        }
    }
</script>

<style scoped>

</style>
