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

    import {login} from "../../api/user";
    import commentList from "@/pages/comment/comment-list";
    import {mapActions} from "vuex";

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
            this.login()

        },
        methods: {
            ...mapActions(['getUserInfo']),
            async login() {
                uni.login({
                    provider: 'weixin',
                    success: function (loginRes) {
                        // console.log('---uni-login')
                        // console.log(loginRes.authResult);
                    }
                });
                let token = uni.getStorageSync('token')
                if (token) {
                    console.log('-----------logined')
                    console.log(token)
                    return
                }
                console.log('------------logining')
                let _this = this
                await wx.login({
                    success(res) {
                        console.log('---wxlogin--succ')
                        console.log(res)
                        let code = res.code
                        if (code) {
                            _this.getUserInfo().then(res => {
                                let data = Object.assign({}, {user: _this.$store.state.userInfo}, {code})
                                login(data).then(res => {
                                    console.log('-------mylogin---')
                                    console.log(res)
                                    uni.setStorageSync('token', res.data.token)
                                })
                            });

                        } else {
                            console.log('登录失败！' + res.errMsg)
                        }
                    }
                })

            },
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
