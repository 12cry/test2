import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

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
