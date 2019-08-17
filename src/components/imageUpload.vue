<template>
    <view>

        <view class="cu-bar bg-white margin-top">
            <view class="action">
                图片上传
            </view>
            <view class="action">
                {{imgList.length}}/{{max}}
            </view>
        </view>
        <view class="cu-form-group">
            <view class="grid col-4 grid-square flex-sub">
                <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
                      :data-url="imgList[index]">
                    <image :src="imgList[index]" mode="aspectFill"></image>
                    <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                        <text class='cuIcon-close'></text>
                    </view>
                </view>
                <view class="solids" @tap="ChooseImage" v-if="imgList.length<max">
                    <text class='cuIcon-cameraadd'></text>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
    export default {
        name: "imageUpload",
        data() {
            return {
                max: 9,
                fileList:[],
                imgList: [],
            }
        },
        methods: {
            upload(filePath) {
                const uploadTask = uni.uploadFile({
                    url: 'http://localhost:9090/file/upload', //仅为示例，非真实的接口地址
                    filePath: filePath,
                    name: 'file',
                    success: (res) => {
                        this.imgList = this.imgList.concat(filePath)
                        this.fileList.push(JSON.parse(res.data))
                    }
                });

                uploadTask.onProgressUpdate((res) => {
                    console.log('上传进度' + res.progress);
                    console.log('已经上传的数据长度' + res.totalBytesSent);
                    console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

                    // 测试条件，取消上传任务。
                    if (res.progress > 50) {
                        // uploadTask.abort();
                    }
                });

            },
            ChooseImage() {
                uni.chooseImage({
                    // count: 4, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: (res) => {
                        const tempFilePaths = res.tempFilePaths

                        tempFilePaths.forEach(value => {
                            this.upload(value)
                        })
                    }
                });
            },
            ViewImage(e) {
                uni.previewImage({
                    urls: this.imgList,
                    current: e.currentTarget.dataset.url
                });
            },
            DelImg(e) {
                uni.showModal({
                    title: '提示',
                    content: '确定要删除？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: res => {
                        if (res.confirm) {
                            this.imgList.splice(e.currentTarget.dataset.index, 1)
                            this.fileList.splice(e.currentTarget.dataset.index, 1)
                        }
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>
