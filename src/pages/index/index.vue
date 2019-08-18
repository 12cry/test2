<template>
    <postList>
        <view class="cry_image_container">
            <image class="cry_image" src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg" mode="widthFix"/>
        </view>

        <view class="cu-list grid col-3">
            <view class="cu-item" v-for="(item,index) in subjectData" :key="index" @click="test(index)">
                <text class="lg text-gray" :class="'cuIcon-' + item.icon"></text>
                <text>{{item.title}}</text>
            </view>
        </view>
    </postList>
</template>

<script>

    import postList from "@/pages/post/post-list"

    import commentList from "@/pages/comment/comment-list";

    export default {
        components: {
            postList, commentList
        },
        data() {
            return {
                subjectData: [
                    {
                        icon: 'news',
                        title: '学院介绍'
                    },
                    {
                        icon: 'newsfill',
                        title: '校园风光'
                    },
                    {
                        icon: 'news',
                        title: '贴吧'
                    },
                ]
            }
        },
        created() {
        },
        methods: {
            test(index) {
                let url;
                console.log(index)
                switch (index) {
                    case 0:
                        url = "/pages/introduce/index"
                        break;
                    case 1:
                        url = "/pages/scenery/index"
                        break;
                }
                uni.navigateTo({
                    url: url
                })
            }
        }
    }
</script>
