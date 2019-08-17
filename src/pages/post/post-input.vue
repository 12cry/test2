<template>
    <view>
        <view class="text-left margin-top-lg">
            <input class="bg-white cry_full_width" v-model="formData.title" placeholder="填写标题"/>
            <textarea class="bg-white cry_full_width margin-top" v-model="formData.content" placeholder="填写评论"/>
            <image-upload ref="imageUpload"/>

        </view>
        <button @tap="commit">提交</button>
        <button @tap="cancel">取消</button>
    </view>
</template>

<script>
    import {mapState, mapMutations, mapActions} from "vuex"
    import {query, save} from "@/api/post";
    import imageUpload from "@/components/imageUpload";

    export default {
        name: "post-input",
        components: {
            imageUpload
        },
        computed: {
            ...mapState(['userInfo'])
        },
        data() {
            return {
                formData: {
                    title: '',
                    content: '',
                    nickName: '',
                    avatarUrl: '',
                    userId: '',
                },
                content: ''
            }
        },
        created() {
            this.formData.avatarUrl = this.userInfo.avatarUrl
            this.formData.nickName = this.userInfo.nickName
            this.formData.userId = this.userInfo.openid
        },
        methods: {

            commit() {

                console.log(
                     this.$refs.imageUpload.fileList
                )
                let fileList = this.$refs.imageUpload.fileList
                let params = Object.assign({}, this.formData, {
                    fileList:fileList
                })
                save(params).then(res => {
                    console.log(res.data)

                    this.$emit('commit', res.data.post)
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
