<template>
    <mescroll-uni :down="downOption" @up="upCallback" @down="downCallback" :fixed="false">
        <slot></slot>


        <view class="comment">
            <input class="bg-white padding-lr" placeholder="填写评论" @focus="openCommentPopup()"/>
            <!--            <textarea v-model="formData.content" placeholder="填写评论" @focus="openCommentPopup"/>-->
            <!--            <button @click="commit">提交</button>-->
        </view>

        <view class="cu-modal" :class="showCommentPopup?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">Modal标题</view>
                    <view class="action" @tap="hideModal">
                        <text class="cuIcon-close text-red"></text>
                    </view>
                </view>
                <view class="padding-xl">

                    <input class="bg-white padding-lr" placeholder="填写评论" v-model="formData.content"/>
                </view>
                <view class="cu-bar bg-white">
                    <!--                    <view class="action margin-0 flex-sub text-green " @tap="hideModal">-->
                    <!--                        <text class="cuIcon-moneybag"></text>-->
                    <!--                        微信支付-->
                    <!--                    </view>-->
                    <view class="action margin-0 flex-sub text-green solid-left" @tap="cancel">取消</view>
                    <view class="action margin-0 flex-sub  solid-left" @tap="commit">确定</view>
                </view>
            </view>
        </view>
        <comment v-for="(item,index) in datalist" :key="index" :nickName="item.nickName" :content="item.content"
                 :commentId="item.id" :children="item.children" :avatarUrl="item.avatarUrl"
                 :createTime="item.createTime" @reply="openCommentPopup"/>
    </mescroll-uni>
</template>

<script>
    import comment from "./comment";
    import {query, save} from "../api/comment";
    import {mapState, mapMutations, mapActions} from "vuex"
    import MescrollUni from "../lib/mescroll-uni/mescroll-uni.vue";
    // import MescrollUni from "mescroll-uni";

    export default {
        name: 'index',
        components: {
            comment, MescrollUni
        },
        computed: {
            ...mapState(['userInfo'])
        },
        data() {
            return {
                showCommentPopup: false,
                hasNextPage: true,
                datalist: [],
                formData: {
                    pid: null,
                    content: '',
                    nickName: '',
                    avatarUrl: '',
                    userId: '',
                },
                images: [],
                downOption: {
                    // auto:false,//是否在初始化完毕之后自动执行下拉回调callback; 默认true
                },
            }
        },
        created() {
            console.log('----create')
        },
        methods: {
            ...mapActions(['getUserInfo']),
            upCallback(mescroll) {
                if (!this.hasNextPage) {
                    mescroll.endSuccess(1)
                    return
                }
                let pageNum = mescroll.num;
                let pageSize = mescroll.size;
                query(pageNum, pageSize).then(res => {
                    this.hasNextPage = res.data.hasNextPage
                    // mescroll.endByPage(res.data.size,res.data.pages)
                    this.$nextTick(() => {
                        mescroll.endSuccess(res.data.size)
                    })
                    this.datalist = this.datalist.concat(res.data.list)
                })
            },

            downCallback(mescroll) {
                mescroll.endSuccess()
            },
            async openCommentPopup(pid) {
                await this.getUserInfo()
                this.formData.avatarUrl = this.userInfo.avatarUrl
                this.formData.nickName = this.userInfo.nickName
                this.formData.userId = this.userInfo.openid
                this.formData.pid = pid
                this.showCommentPopup = true
            },
            commit() {
                save(this.formData).then(res => {
                    let comment = res.data.comment
                    if (comment.pid) {
                        let parentComment = this.datalist.find(val => {
                            return val.id == comment.pid
                        })
                        parentComment.children ? parentComment.children.unshift(comment) : parentComment.children = [comment]
                    } else {
                        this.datalist.unshift(comment)
                    }
                    this.showCommentPopup = false
                })
            },
            cancel() {
                this.showCommentPopup = false
            }
        }
    }
</script>

<style scoped>
    .comment {
        margin-top: 20px;
    }
</style>
