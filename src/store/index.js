import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

// 1.安装插件
Vue.use(Vuex)

const state = {
    cartList: []
}
// 2.创建Store对象
const store = new Vuex.Store({
    state,
    // mutations唯一的目的就是修改state中的状态
    // mutations中的每个方法尽可能完成的事件单一一点
    mutations,
    actions,
})

// 3.导出，挂载Vue实例上
export default store