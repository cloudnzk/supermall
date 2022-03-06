// 使用混入来复用代码

import {debounce} from './utils'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
        }
    },
    mounted() {
      //console.log('打印内容')
      //1.图片加载完成的事件监听
      const newRefresh = debounce(this.$refs.scroll.refresh,500)
      
      // 对监听的事件进行保存,便于取消.
      // 取消的目的是在详情页加载GoodList时，不刷新Home页
      this.itemImgListener = () => {
        newRefresh(20,30,'abc')
      }
      //监听item中图片加载完成
      this.$bus.$on('itemImageLoad',this.itemImgListener)
      
    },
}