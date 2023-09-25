/*
 * @Author: wangguixing
 * @Date: 2023-09-25 15:34:40
 * @LastEditors: wangguixing
 * @LastEditTime: 2023-09-25 16:03:38
 * @FilePath: \src\main.js
 */
import Vue from 'vue';
import App from '~/App';
import Cookies from 'js-cookie';
import axios from 'axios';
//实现svg按需加载与全量加载的控制
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.config.devtools = process.env.NODE_ENV === 'development';
new Vue({
  render: h => h(App),
}).$mount('#app');
