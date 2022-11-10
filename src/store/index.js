import Vue from "vue";
import Vuex from "vuex";
import Auth from "./Modules/Auth";
import Statistics from "./Modules/Statistics";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        Auth,
        Statistics
    },
});
