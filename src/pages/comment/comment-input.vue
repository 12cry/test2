<template>
    <view>
        <view class="text-left margin-top-lg">
            <textarea :class="contentV" class="bg-white cry_full_width" v-model="formData.content" placeholder="写评论..."/>
        </view>
        <button class="cu-btn block bg-blue margin-sm lg" @tap="commit">提交</button>
        <button class="cu-btn block bg-blue margin-sm lg" @tap="cancel">取消</button>
    </view>
</template>

<script>
    import {query, save} from "@/api/comment";
    import {validate} from "@/utils";

    export default {
        name: "comment-input",
        props: {
            pid: null,
            targetId: null
        },
        data() {
            return {
                contentV:'',
                formData: {
                    content: '',
                },
            }
        },
        created() {
            this.formData.pid = this.pid
            this.formData.targetId = this.targetId
        },
        methods: {
            commit() {
                if(!validate(this,['content'],'formData')){
                    return
                }
                save(this.formData).then(res => {
                    this.$emit('commit', res.data)
                })
            },
            cancel() {
                this.$emit('cancel')
            }
        }
    }
</script>
