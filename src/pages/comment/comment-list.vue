<template>
    <view>
        <commentInput :target-id="targetId" :pid="pid" v-if="commentInputVisible" @commit="commit" @cancel="closeAll"/>
        <view v-show="!commentInputVisible">
            <mescroll-uni :down="downOption" @up="upCallback" @down="downCallback">
                <slot></slot>
                <view class="margin-top">
                        <button class="cu-btn block bg-blue margin-sm lg" @click="toCommentInput()">填写评论</button>
                </view>
                <comment v-for="(item,index) in datalist" :postData="item" :key="index" @toCommentInput="toCommentInput"/>
            </mescroll-uni>
        </view>
    </view>
</template>

<script>
    import comment from "./comment";
    import {query, save} from "@/api/comment";
    import {mapState, mapMutations, mapActions} from "vuex"
    import MescrollUni from "@/lib/mescroll-uni/mescroll-uni.vue";
    import commentInput from './comment-input'

    export default {
        name: 'index',
        components: {
            comment, MescrollUni, commentInput
        },
        computed: {
            ...mapState(['userInfo'])
        },
        props:{
          targetId:null
        },
        data() {
            return {
                pid:null,
                commentInputVisible: false,
                hasNextPage: true,
                datalist: [],
                images: [],
                downOption: {
                },
            }
        },
        created() {
        },
        methods: {
            ...mapActions(['getUserInfo']),
            upCallback(mescroll) {
                if (!this.hasNextPage) {
                    mescroll.endSuccess(1)
                    return
                }
                let page = mescroll.num;
                let rows = mescroll.size;
                query({page,rows,targetId:this.targetId}).then(res=>{
                    this.hasNextPage = res.data.hasNextPage
                    this.$nextTick(() => {
                        mescroll.endSuccess(res.data.size)
                    })
                    this.datalist = this.datalist.concat(res.data.list)
                })
            },

            downCallback(mescroll) {
                mescroll.resetUpScroll()
                // mescroll.endSuccess(1)
            },
            async toCommentInput(pid) {
                await this.getUserInfo()
                this.pid = pid
                this.commentInputVisible = true
            },
            commit(comment) {

                    if (comment.pid) {
                        let parentComment = this.datalist.find(val => {
                            return val.id == comment.pid
                        })
                        parentComment.children ? parentComment.children.unshift(comment) : parentComment.children = [comment]
                    } else {
                        this.datalist.unshift(comment)
                    }
                    this.commentInputVisible = false
            },
            closeAll() {
                this.commentInputVisible = false
            }
        }
    }
</script>
