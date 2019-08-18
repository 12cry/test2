<template>
    <commentList :targetId="2">
        <view class="cry_image_container">
            <image class="cry_image" v-for="(item,index) in images" :src="item.src" :key="index" mode="widthFix"/>
        </view>
    </commentList>
</template>

<script>
    import commentList from "@/pages/comment/comment-list";

    export default {
        name: 'index',
        components: {
            commentList
        },
        data() {
            return {
                images: []
            }
        },
        created() {
            this.images = [
                // {src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564967349957&di=7eb44367311d2e202e82cc98985958d3&imgtype=0&src=http%3A%2F%2Fi.ebayimg.com%2F00%2Fs%2FOTNYMTUw%2Fz%2FoCgAAOSwHIhZjEiI%2F%2524_45.JPG'},
                // {src: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2972907077,2521113900&fm=11&gp=0.jpg'},
                {src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg'},
            ]
        },
        methods: {}
    }
</script>
