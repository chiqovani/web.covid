import axios from "axios";
import Vue from 'vue'

const state = {
    statistics : null,
    summary: null
}
const mutations = {
    setStatistics(state, data) {
        Vue.set(state, 'statistics', data);
    },
    setSummary(state, data) {
        Vue.set(state, 'summary', data);
    }
}
const getters = {
    getStatistics: state => {
        return state.statistics;
    },
    getSummary: state => {
        return state.summary;
    }
}
const actions = {
    getStatisticsAction({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            axios({url: process.env.VUE_APP_API_URL + '/api/statistics', method: 'GET'})
                .then(resp => {
                    commit('setStatistics', resp.data.data)
                })
        })
    },
    getSummaryAction({commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
            axios({url: process.env.VUE_APP_API_URL + '/api/summary', method: 'GET'})
                .then(resp => {
                    commit('setSummary', resp.data.data)
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
