<template>
    <view>
<!--        <button @click="cancel">tttttG</button>-->
        <CommentInput v-if="commentInputVisible" @commit="commit" @cancel="cancel"/>
        <view v-show="!commentInputVisible">
            <mescroll-uni :down="downOption" @up="upCallback" @down="downCallback">
                <slot></slot>
                <view class="comment">
                    <input class="bg-white padding-lr" placeholder="填写评论" @focus="toCommentInput()"/>
                    <!--                        <textarea v-model="formData.content" placeholder="填写评论" @focus="openCommentPopup"/>-->
                    <!--            <button @click="commit">提交</button>-->
                </view>
                <!--            <view class="cu-modal " :class="commentInputVisible?'show':''">-->
                <!--                <view class="cu-dialog">-->
                <!--                    <view class="cu-bar bg-white">-->
                <!--                        <view class="action text-green" @tap="commit">确定</view>-->
                <!--                        <view class="action text-blue" @tap="cancel">取消</view>-->
                <!--                    </view>-->
                <!--                    <view class="text-left margin-top">-->
                <!--                        <textarea class="bg-white cry_comment" v-model="formData.content" placeholder="填写评论"/>-->
                <!--                    </view>-->
                <!--                </view>-->
                <!--            </view>-->
                <comment v-for="(item,index) in datalist" :key="index" :nickName="item.nickName" :content="item.content"
                         :commentId="item.id" :children="item.children" :avatarUrl="item.avatarUrl"
                         :createTime="item.createTime" @reply="toCommentInput"/>
            </mescroll-uni>
        </view>
    </view>
</template>

<script>
    import comment from "./comment";
    import {query, save} from "../api/comment";
    import {mapState, mapMutations, mapActions} from "vuex"
    import MescrollUni from "../lib/mescroll-uni/mescroll-uni.vue";
    import commentInput from './comment-input'
    // import MescrollUni from "mescroll-uni";

    export default {
        name: 'index',
        components: {
            comment, MescrollUni, commentInput
        },
        computed: {
            ...mapState(['userInfo'])
        },
        data() {
            return {
                commentInputVisible: false,
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
                    this.$nextTick(() => {
                        mescroll.endSuccess(res.data.size)
                    })
                    this.datalist = this.datalist.concat(res.data.list)
                })
            },

            downCallback(mescroll) {
                mescroll.endSuccess(1)
            },
            async toCommentInput(pid) {
                await this.getUserInfo()
                this.formData.avatarUrl = this.userInfo.avatarUrl
                this.formData.nickName = this.userInfo.nickName
                this.formData.userId = this.userInfo.openid
                this.formData.pid = pid
                this.commentInputVisible = true
                // uni.navigateTo({
                //     url: '/components-my/comment-input'
                // })
            },
            commit(content) {
                this.formData.content = content
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
                    this.commentInputVisible = false
                })
            },
            cancel() {
                this.commentInputVisible = false
            }
        }
    }
</script>

<style scoped>
    .comment {
        margin-top: 20px;
    }

    .cry_comment {
        width: 100%;
        margin: 0;
        padding: 0;
    }
</style>
