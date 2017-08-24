// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

import './common/stylus/index.styl'

// 应用fastclick
fastclick.attach(document.body);
// 应用Vue-lazyload
Vue.use(VueLazyload, {
  loading: require('./common/images/blank.jpg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
