// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// eslint-disable-next-line no-unused-vars
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // ui css 样式导入
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
// 配置axios
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(ElementUI)


axios.interceptors.request.use(config => {
  console.log('Actual URL:', config.url);
  return config;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
