<template>
    <!-- 与Swiper组件里面的类名冲突，里面用了querySelector取DOM元素 -->
    <!-- <swiper class="swiper"> -->
    <swiper class="detail-swiper">
        <swiper-item v-for="item in topImages" :key="item">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: "DetailSwiper",
  data () {
   return {}
  },
  components: {
      Swiper,
      SwiperItem
  },
  props:{
      topImages:{
          type: Array,
          default(){
              return []
          }
      }
  },
  methods:{}
}
</script>
<style scoped>
    .detail-swiper{
        height: 300px;
        overflow: hidden;
    }
</style>