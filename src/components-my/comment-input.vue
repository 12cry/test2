<template>
    <view>

        <view class="text-left margin-top-lg">
            <textarea class="bg-white cry_full_width" v-model="content" placeholder="填写评论"/>
        </view>
        <button @tap="commit">提交</button>
        <button @tap="cancel">取消</button>
<!--        <view class="cu-bar bg-white">-->
<!--            <view class="action text-green" @tap="commit">确定</view>-->
<!--            <view class="action text-blue" @tap="cancel">取消</view>-->
<!--        </view>-->
    </view>
</template>

<script>
    export default {
        name: "comment-input",
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
