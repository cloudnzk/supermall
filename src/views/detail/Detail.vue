<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" 
        ref="scroll" 
        @scroll="contentScroll"
        :probe-type="3">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
            <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
            <good-list ref="recommend" :goods="recommends"></good-list>
        </scroll>
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import GoodList from 'components/content/goods/GoodsList'

import Scroll from 'components/common/scroll/Scroll'

import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
export default {
  name: "Detail",
  components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodList,
      currentIndex: 0,
  },
  // mixins：混入，便于功能复用。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。
  mixins: [itemListenerMixin],
  data () {
   return {
       iid: null,
       topImages: [],
       goods: {},
       shop: {},
       detailInfo: {},
       paramInfo: {},
       commentInfo: {},
       recommends: [],
       themeTopYs: [],
       getThemeTopY: null,
   }
  },
  created(){
      // 1.保存传入的iid，因为是用query传参，所以要用this.$route.query取出内容
      // this.iid = this.$route.params.iid;
      this.iid = this.$route.query.iid;
      
      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        // 1.获取顶部轮播图
        const data = res.data.result
        this.topImages = data.itemInfo.topImages;
        // console.log(this.topImages);

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        
        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo)
        
        // 4.获取商品的详情数据
        this.detailInfo = data.detailInfo
        
        // 5.获取商品的参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        
        // 6.获取评论信息
        if (data.rate.list){
            this.commentInfo = data.rate.list[0]
        }
        
        // 第一次获取，值不对
        // 原因：this.$refs.params.$el没有渲染
        /*
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
        */

        // 第二次获取，值不对
        // 等到页面渲染完，会回调这个函数
        // 根据最新的数据，对应的DOM是已经被渲染出来了
        // 但是图片依然没有加载完（目前的offsetTop不包括图片)
        /*
        this.$nextTick(() => {
             //获取每个部分的offsetTop，并设置滚动距离
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            console.log(this.themeTopYs);
        })
        */
      })
      
      getRecommend().then(res => {
          this.recommends = res.data.data.list
      })
      
      // 对getThemeTopY赋值，进行防抖
      this.getThemeTopY = debounce(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          
        //   console.log(this.themeTopYs);
      },100)
  },
  methods:{
      imageLoad(){
          this.$refs.scroll.refresh()
          
          this.getThemeTopY()
      },
      titleClick(index){
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
          // 1.获取y值
          const positionY = -position.y
          
          // 2.positionY和主题中值进行对比
          let length = this.themeTopYs.length
          for(let i = 0; i < length; i++){
              if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i])){
                console.log(i);
                this.currentIndex = i;
                //传到NavBar组件中
                this.$refs.nav.currentIndex = this.currentIndex
              }
          }
      }
  },
  mounted() {
    
  },
  updated(){

  },
  // 为什么这里不能在deactivated里取消事件？因为详情页没有缓存，方法无效
  destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
}
</script>
<style scoped>
    #detail{
        /* 隐藏掉下面的tabbar，因为tabbar是固定定位，已经脱离了标准流 */
        position: relative;
        z-index: 9;
        background-color: #fff;
        /* 给滚动区域的父元素设置具体高度，否则是根据内容撑开 */
        height: 100vh;
    }

    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        /* 设置滚动区域的高度，这里的100%是父元素的高度，所以要指定一个具体的父元素高度 */
        /* calc内要加空格，才能生效 */
        height: calc(100% - 44px); 
        /* 设置一个定位，才能让子元素的offsetTop获取正常 */
        position: absolute;
        top: 44px;
        bottom: 0;
    }
</style>