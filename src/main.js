import Vue from 'vue'
import App from './App'
import store from './store'
// import licia from 'miniprogram-licia'
import dateUtil from './utils/dateUtil'
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.filter('dateFormatFilter', function (value, formatType) {
    if (!value) {
        return ''
    }
    console.log(format);
    let format = 'yyyy-mm-dd'
    if (formatType == 2) {
        format = 'yyyy-mm-dd HH:MM:ss'
    }
    let d = dateUtil.dateFormat(value, format)
    return d
})
App.mpType = 'app'

import cuCustom from './lib/colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
const app = new Vue({
    store,
    ...App
})
app.$mount()


// const originRequest = wx.request;
// Object.defineProperty(wx, 'request', {
//   configurable: true,
//   enumerable: true,
//   writable: true,
//   value: function() {
//     const config = arguments[0] || {};
//     const url = config.url;
//     console.log('发送了ajax，url是: ', url);
//     return originRequest.apply(this, arguments);
//   }
// });
