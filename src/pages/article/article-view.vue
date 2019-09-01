<template>
  <commentList :targetId="id">
    <view>
      <!-- <view class="text-gl padding">{{formData.content}}</view> -->
      <view class="solids-bottom text-center text-black text-bold text-xl padding">{{formData.title}}</view>
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
        console.log('ccccccccc');

        queryById(this.id).then(res => {
            this.formData = res.data;
        });
    }
};
</script>