<template>
    <view>
        <view class="text-left margin-top-lg">
            <textarea class="bg-white cry_full_width" v-model="content" placeholder="填写评论"/>
        </view>
        <button @tap="commit">提交</button>
        <button @tap="cancel">取消</button>
    </view>
</template>

<script>
    export default {
        name: "post-input",
        data() {
            return {
                content: ''
            }
        },
        methods: {
            commit() {
                this.$emit('commit', this.content)
            },
            cancel() {
                this.$emit('cancel')
            }
        }
    }
</script>

<style scoped>

</style>
