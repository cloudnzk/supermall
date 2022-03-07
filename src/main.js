import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store"

Vue.config.productionTip = false

/* 怎么应对非父子组件通信问题
*  定义一个事件总线$bus，作为事件分发和监听的中心
*  创建一个空的实例，全局定义
*/
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
