<template>
    <view class="cu-list menu-avatar comment margin-top solids-top">
        <view class="cu-item">
            <view class="cu-avatar round"
                  :style="'background-image:url('+postData.avatarUrl+');'"></view>
            <view class="content">
                <view class="text-grey">{{postData.nickName}}</view>
                <view class="text-gray text-content text-df">
                    {{postData.content}}
                </view>

                <view v-for="(item ,index) in postData.children" :key="index" class="bg-grey padding-sm radius margin-top-sm  text-sm">
                    <view class="flex">
                        <view class="margin-top-xs">{{item.nickName}}：</view>
                        <view class="flex-sub margin-top-xs">{{item.content}}</view>
                    </view>
                </view>
                <view class="margin-top-sm flex justify-between">
                    <view class="text-gray text-df">{{postData.createTime|dateFormatFilter}}</view>
                    <view>
                        <text @click="toggleAppreciate" class="cuIcon-appreciatefill " :class="{'text-red':appreciate,'text-gray':!appreciate}"></text>
                        <text class="cuIcon-messagefill text-gray margin-left-sm" @click="toCommentInput(postData.id)"></text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import comment from './comment'

    export default {
        name: "comment",
        components: {
            comment
        },
        props: {
            postData:{}
        },

        postData() {
            return {
                appreciate: false
            }
        },
        created() {

        },
        methods: {
            toggleAppreciate(){
               this.appreciate=this.appreciate?false:true
            },
            toCommentInput(commentId) {

                this.$emit('toCommentInput', commentId)
            },
        }

    }
</script>
