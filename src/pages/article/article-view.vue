<template>
  <commentList :targetId="id">
    <view>
      <view class="solids-bottom text-center text-black text-bold text-xl padding">{{formData.title}}</view>
      <view class="margin-sm flex justify-between padding">
        <view class="text-gray text-df">{{formData.author}}</view>
        <view class="text-gray text-df">{{formData.publicTime|dateFormatFilter}}</view>
      </view>
      <rich-text :nodes="formData.content" />
    </view>
  </commentList>
</template>
<script>
import commentList from '@/pages/comment/comment-list';
import { queryById } from '@/api/article';
export default {
    components: {
        commentList
    },
    onLoad(option) {
        this.id = option.id;
    },

    props: {
        id: String
    },
    data() {
        return {
            formData: {}
        };
    },
    created() {
        queryById(this.id).then(res => {
            this.formData = res.data;
        });
    }
};
</script>