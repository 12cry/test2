<template>
    <view>
        <view class="text-left margin-top-lg">
            <textarea class="bg-white cry_full_width" v-model="formData.content" placeholder="写评论..."/>
        </view>
        <button class="cu-btn block bg-blue margin-sm lg" @tap="commit">提交</button>
        <button class="cu-btn block bg-blue margin-sm lg" @tap="cancel">取消</button>
    </view>
</template>

<script>
    import {query, save} from "@/api/comment";
    import {mapState, mapMutations, mapActions} from "vuex"

    export default {
        name: "comment-input",
        computed: {
            ...mapState(['userInfo'])
        },
        props: {
            pid: null,
            targetId: null
        },
        data() {
            return {
                formData: {
                    pid: null,
                    content: '',
                    nickName: '',
                    avatarUrl: '',
                    userId: '',
                },
            }
        },
        created() {

            this.formData.avatarUrl = this.userInfo.avatarUrl
            this.formData.nickName = this.userInfo.nickName
            this.formData.userId = this.userInfo.openid
            this.formData.pid = this.pid
            this.formData.targetId = this.targetId
        },
        methods: {
            commit() {

                save(this.formData).then(res => {
                    this.$emit('commit', res.data.comment)
                })
            },
            cancel() {
                this.$emit('cancel')
            }
        }
    }
</script>

<style scoped>

</style>
