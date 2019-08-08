<template>
    <mescroll-uni :down="downOption" @up="upCallback" @down="downCallback" :fixed="false">
        <slot></slot>
        <view class="">
            <textarea v-model="dataForm.content" placeholder="填写评论" @focus="onFocusContent"/>
            <button @click="commit">提交</button>
        </view>
        <comment v-for="(item,index) in datalist" :key="index" :nickName="item.nickName" :content="item.content"
                 :commentId="item.id" :children="item.children" :avatarUrl="item.avatarUrl"
                 :createTime="item.createTime" @afterReply="afterReply"/>
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
                hasNextPage: true,
                datalist: [],
                dataForm: {
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
                let pageNum = mescroll.num; // 页码, 默认从1开始
                let pageSize = mescroll.size; // 页长, 默认每页10条
                query('/comment/query', {page: pageNum, rows: pageSize}).then(res => {
                    console.log(res)
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
            afterReply(replyComment) {
                let comment = this.datalist.find(val => {
                    return val.id == replyComment.pid
                })
                comment.children ? comment.children.unshift(replyComment) : comment.children = [replyComment]
            },
            async onFocusContent() {
                await this.getUserInfo()
                this.dataForm.avatarUrl = this.userInfo.avatarUrl
                this.dataForm.nickName = this.userInfo.nickName
                this.dataForm.userId = this.userInfo.openid
            },
            commit() {
                save(this.dataForm).then(res => {
                    this.datalist.unshift(res.data.comment)
                })
            },
            add() {
                console.log('--add')
            }
        }
    }
</script>

<style scoped>
    .comment {
        margin-top: 20px;
    }
</style>
