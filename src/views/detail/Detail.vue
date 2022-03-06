<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="content" ref="scroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo"></detail-param-info>
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

import Scroll from 'components/common/scroll/Scroll'

import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'
export default {
  name: "Detail",
  components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo
  },
  data () {
   return {
       iid: null,
       topImages: [],
       goods: {},
       shop: {},
       detailInfo: {},
       paramInfo: {},
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
      })
  },
  methods:{
      imageLoad(){
          this.$refs.scroll.refresh()
      }
  }
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
    }
</style>