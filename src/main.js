import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store"

import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

/* 怎么应对非父子组件通信问题
*  定义一个事件总线$bus，作为事件分发和监听的中心
*  创建一个空的实例，全局定义
*/
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 安装懒加载插件
Vue.use(VueLazyload,{
  // 在JS中怎么导入图片？require或者import
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
