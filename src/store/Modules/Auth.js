import axios from "axios";
import Vue from 'vue'

const state = {
    token: localStorage.getItem('token') || '',
    state: {},
    isLoggedIn: false,
}
const mutations = {
    setToken(state, data) {
        Vue.set(state, 'token', data);
        localStorage.setItem('token', data)
        Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + data

    },
    setIsLoggedIn(state, data) {
        Vue.set(state, 'isLoggedIn', data);
    },
    logout(state) {
        Vue.set(state, 'token', '');
        Vue.set(state, 'isLoggedIn', false);
    }
}
const getters = {
    isLoggedIn: state => {
        return state.isLoggedIn;
    }
}
const actions = {
    register(ctx, data) {
        return axios.post(process.env.VUE_APP_API_URL + '/api/register', data);
    },
    login({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            axios({url: process.env.VUE_APP_API_URL + '/api/login', data: data, method: 'POST'})
                .then(resp => {
                    resolve(resp)
                })
                .catch(err => {
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    logout({commit}) {
        return new Promise((resolve) => {
            axios({url: process.env.VUE_APP_API_URL + '/api/logout', method: 'POST'}).then(() => {
                commit('logout')
                localStorage.removeItem('token')
                delete Vue.prototype.$http.defaults.headers.common['Authorization']
                resolve()
            })
        })
    },
    getUserInfo({commit, dispatch}) {
        return new Promise((resolve, reject) => {

            if (!localStorage.getItem('token')) {
                reject("LOCALSTORAGE_EMPTY");
            }
            axios({url: process.env.VUE_APP_API_URL + '/api/check'})
                .then(resp => {
                    commit('setIsLoggedIn', true)
                    resolve(resp)
                })
                .catch(err => {
                    localStorage.removeItem('token');
                    commit('setIsLoggedIn', false)
                    reject(err)
                })
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
