<template>
    <view>
        <view class="text-left ">
            <view class="padding-sm">
                <view class="flex flex-wrap justify-around">
                    <button class="cu-btn margin-sm basis-sm shadow" :class="['bg-blue','animation-shake']">tttttttt</button>
                </view>
            </view>
            <input class="bg-white margin-top " :class="titleV" v-model="formData.title" placeholder="写标题..."/>
            <!--            <input class="bg-white margin-top " :class="must=='title'?'animation-shake':''" v-model="formData.title" placeholder="写标题..."/>-->
            <textarea maxlength="2000" :class="contentV" class="bg-white cry_full_width margin-top" v-model="formData.content" placeholder="写内容..."/>
            <image-upload ref="imageUpload"/>

        </view>
        <button class="cu-btn block bg-blue margin-sm lg" @tap="commit">提交</button>
        <button class="cu-btn block bg-blue margin-sm lg" @tap="cancel">取消</button>
    </view>
</template>

<script>
    import {mapState, mapMutations, mapActions} from "vuex"
    import {query, save} from "@/api/post";
    import imageUpload from "@/components/imageUpload";
    import {validate} from "@/utils";

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
                titleV: '',
                contentV: '',
                must: '',
                formData: {
                    title: '',
                    content: '',
                    nickName: '',
                    avatarUrl: '',
                },
                content: ''
            }
        },
        created() {
            this.formData.avatarUrl = this.userInfo.avatarUrl
            this.formData.nickName = this.userInfo.nickName
            this.formData.openid = this.userInfo.openid
        },
        methods: {
           commit() {

                if (!validate(this,['title','content'],'formData')) {
                    return
                }
                let fileList = this.$refs.imageUpload.fileList
                let params = Object.assign({}, this.formData, {
                    fileList: fileList
                })
                save(params).then(res => {
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
