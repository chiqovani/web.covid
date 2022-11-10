import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueSanctum from 'vue-sanctum';
import axios from 'axios';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import i18n from './i18n'

Vue.prototype.$http = axios;
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false;

Vue.use(VueSanctum, {
    axios: axios
});
const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = "Bearer " + token
}

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App)
}).$mount('#app');

