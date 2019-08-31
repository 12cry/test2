<template>
  <mescroll-uni :down="downOption" @up="upCallback" @down="downCallback">
    <slot></slot>
    <article2 v-for="(item,index) in listData" :key="index" :formData="item" />
  </mescroll-uni>
</template>

<script>
import article2 from './article';
import { query } from '@/api/article';
import MescrollUni from '@/lib/mescroll-uni/mescroll-uni.vue';

export default {
    name: 'index',
    components: {
        article2,
        MescrollUni
    },
    data() {
        return {
            hasNextPage: true,
            listData: [],
            downOption: {
                auto: false
            }
        };
    },
    created() {
        console.log('--articlelist');
    },
    methods: {
        upCallback(mescroll) {
            if (!this.hasNextPage) {
                mescroll.endSuccess(1);
                return;
            }
            let page = mescroll.num;
            let rows = mescroll.size;
            query({ page, rows }).then(res => {
                this.hasNextPage = res.data.hasNextPage;
                this.$nextTick(() => {
                    mescroll.endSuccess(res.data.size);
                });
                this.listData = this.listData.concat(res.data.list);
                console.log(this.listData);
            });
        },
        downCallback(mescroll) {
            mescroll.resetUpScroll();
        }
    }
};
</script>
