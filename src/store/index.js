import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: null,
        hasLogin: false,
        loginProvider: "",
        openid: null
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        login(state, provider) {
            state.hasLogin = true;
            state.loginProvider = provider;
        },
        logout(state) {
            state.hasLogin = false
            state.openid = null
        },
        setOpenid(state, openid) {
            state.openid = openid
        }
    },
    actions: {
        getUserInfo: async function ({
                                         commit,
                                         state
                                     }) {
            return await new Promise((resolve, reject) => {
                uni.getUserInfo({
                    success: function (res) {
                        console.log('-------getUserInfo')
                        console.log(res)
                        if (state.userInfo) {
                            resolve(state.userInfo)
                        } else {
                            commit('setUserInfo', res.userInfo)
                            resolve(res.userInfo)
                        }
                    },
                    fail:function (res) {
                        console.log('---------getUserInfo---fail')
                        console.log(res)

                    }
                })


            })
        },
    }
})

export default store
