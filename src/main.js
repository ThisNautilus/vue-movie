import Vue from 'vue'
import App from './App.vue'
import router from './routers' // 此写法是寻找routers目录下的index.js
import store from './stores' // 此写法是寻找stores目录下的index.js

import axios from 'axios'
Vue.prototype.axios = axios;

// 定义全局过滤器用于处理图片的宽高
Vue.filter('setWH', (url, arg) => {
    return url.replace(/w\.h/, arg);
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')