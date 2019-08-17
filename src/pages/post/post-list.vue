<template>
    <view>
        <postInput v-if="postInputVisible" @commit="commit" @cancel="cancel"/>
        <view v-show="!postInputVisible">
            <mescroll-uni :down="downOption" @up="upCallback" @down="downCallback">
                <slot></slot>
                <view class="margin-top">
                    <button @click="topostInput()">填写评论</button>
                </view>
                <post v-for="(item,index) in datalist" :key="index" :nickName="item.nickName" :content="item.content"
                      :postId="item.id" :children="item.children" :avatarUrl="item.avatarUrl"
                      :createTime="item.createTime" @reply="topostInput"/>
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

    export default {
        name: 'index',
        components: {
            post, MescrollUni, postInput
        },
        computed: {
            ...mapState(['userInfo'])
        },
        data() {
            return {
                postInputVisible: false,
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
                downOption: {},
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
                    this.datalist = this.datalist.concat(res.data.list)
                })
            },

            downCallback(mescroll) {
                mescroll.endSuccess(1)
            },
            async topostInput(pid) {
                await this.getUserInfo()
                this.formData.avatarUrl = this.userInfo.avatarUrl
                this.formData.nickName = this.userInfo.nickName
                this.formData.userId = this.userInfo.openid
                this.formData.pid = pid
                this.postInputVisible = true
            },
            commit(content) {
                this.formData.content = content
                save(this.formData).then(res => {
                    let post = res.data.post
                    if (post.pid) {
                        let parentpost = this.datalist.find(val => {
                            return val.id == post.pid
                        })
                        parentpost.children ? parentpost.children.unshift(post) : parentpost.children = [post]
                    } else {
                        this.datalist.unshift(post)
                    }
                    this.postInputVisible = false
                })
            },
            cancel() {
                this.postInputVisible = false
            }
        }
    }
</script>
