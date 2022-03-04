<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 加ref属性是为了获得组件对象 -->
    <scroll class="content" 
      ref="scroll" 
      :probe-type="3" 
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore">
        <home-swiper :banners=banners></home-swiper>
        <recommend-view :recommends=recommends></recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control" 
          :titles="['流行','新款','精选']" 
          @tabClick="tabClick">
        </tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 为什么这里需要用到.native修饰符？ 
        因为需要监听一个组件的原生事件时，必须加上才能监听-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'
  
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'


  import {getHomeMultidata,getHomeGoods} from 'network/home'
  import {debounce} from 'common/utils'
  
  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {

      return {
        banners: [],
        recommends: [],
        // 保存商品数据的数据结构设计
        goods:{
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: true
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created(){
      // 1.请求多个数据
      this.getHomeMultidata()
      // 2.请求商品数据。都先请求一页
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      const refresh = debounce(this.$refs.scroll.refresh,500)

      //3.监听item中图片加载完成
      this.$bus.$on('itemImageLoad',() => {
        // this.$refs.scroll.refresh()
        refresh()
      })
    },

    methods: {
      /**
       * 事件监听相关的方法
       */
      //防抖
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
      },

      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      
      contentScroll(position){
        // console.log(position);
        this.isShowBackTop = -position.y > 1000
      },
      
      loadMore(){
        // console.log('上拉加载更多');
        // 上拉加载请求数据
        this.getHomeGoods(this.currentType)

        // 图片异步加载完后，刷新可滚动区域的高度
        // this.$refs.scroll.scroll.refresh()
      },


      /**
       * 网络请求相关的方法
       */
      /* 多封装一层，一般不在created()里面写具体实现 */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
            // console.log(res);
            // 保存数据
            this.banners = res.data.data.banner.list
            this.recommends = res.data.data.recommend.list
          }
        )
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // 如何将一个数组的内容添加到另一个数组中
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1

          // 完成上拉加载更多，允许下一次上拉加载
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<!-- 加了scoped 与没加的区别：加了之后只对本组件起作用。
      如果其他组件有同样类名的，不起作用-->
<style scoped>
  #home {
    /*padding-top: 44px;*/
    /* 100% viewpoint视口 */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    /* 如何指定滚动的区域：即顶部navbar与底部tabbar之间的区域 
     * (1)定位。现在使用的方法
     * (2)calc(100%-上下高度之和)
    */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  
</style>