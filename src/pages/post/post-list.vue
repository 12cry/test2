<template>
    <view>
        <postInput v-if="postInputVisible" @commit="commit" @cancel="closeAll"/>
        <commentInput :targetId="targetId" v-if="commentInputVisible" @commit="commentCommit" @cancel="closeAll"/>
        <view v-show="!postInputVisible&&!commentInputVisible">
            <mescroll-uni :down="downOption" @up="upCallback" @down="downCallback">
                <slot></slot>
                <view class="margin-top">
                    <button class="cu-btn block bg-blue margin-sm lg" @click="toPostInput()">发帖</button>
                </view>
                <post v-for="(item,index) in datalist" :key="index" :postData="item" @toCommentInput="toCommentInput"/>
            </mescroll-uni>
        </view>
    </view>
</template>

<script>
    import post from "./post";
    import {query, save} from "@/api/post";
    import {mapState, mapMutations, mapActions} from "vuex"
    import MescrollUni from "@/lib/mescroll-uni/mescroll-uni.vue";
    import postInput from './post-input'
    import commentInput from '@/pages/comment/comment-input'

    import {url_file} from "@/utils/request";

    export default {
        name: 'index',
        components: {
            post, MescrollUni, postInput, commentInput
        },
        data() {
            return {
                targetId: null,
                postInputVisible: false,
                commentInputVisible: false,
                hasNextPage: true,
                datalist: [],
                images: [],
                downOption: {
                    auto:false
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
                let pageNum = mescroll.num;
                let pageSize = mescroll.size;
                query(pageNum, pageSize).then(res => {
                    this.hasNextPage = res.data.hasNextPage
                    this.$nextTick(() => {
                        mescroll.endSuccess(res.data.size)
                    })
                    res.data.list.forEach(post => {
                        post.fileList.forEach(file => {
                            file.url = url_file + file.name
                        })
                    })
                    this.datalist = this.datalist.concat(res.data.list)
                })
            },
            downCallback(mescroll) {
                // this.datalist=[]
                mescroll.resetUpScroll()
                // mescroll.endSuccess(1)
            },
            async toCommentInput(targetId) {
                await this.getUserInfo()
                this.targetId = targetId
                this.commentInputVisible = true
            },
            commentCommit(comment) {
                let parent = this.datalist.find(val => {
                    return val.id == comment.targetId
                })
                parent.commentList ? parent.commentList.unshift(comment) : parent.commentList = [comment]
                this.closeAll()
            },
            async toPostInput() {
                await this.getUserInfo()
                this.postInputVisible = true
            },
            commit(post) {
                post.fileList.forEach(file => {
                    file.url = url_file + file.name
                })
                this.datalist.unshift(post)
                this.closeAll()
            },
            closeAll() {
                this.postInputVisible = false
                this.commentInputVisible = false
            }
        }
    }
</script>
