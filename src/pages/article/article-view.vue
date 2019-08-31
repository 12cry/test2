<template>
  <view>
    <view class="solids-bottom text-center text-black text-bold text-xl padding">{{formData.title}}</view>
    <view class="text-gl padding">{{formData.content}}</view>
    <rich-text :nodes="formData.content"/>
  </view>
</template>
<script>
import { queryById } from '@/api/article';
export default {
    props: {
        id: String
    },
    data() {
        return {
            formData: {}
        };
    },
    created() {
        // queryById(this.id).then(res => {
        queryById('1').then(res => {
            this.formData = res.data;
        });
    }
};
</script>