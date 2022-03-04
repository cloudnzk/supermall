<template>
  <swiper>
      <swiper-item v-for="item in banners" :key="item.link">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>
<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: "HomeSwiper",
  props: {
      banners: {
          type: Array,
          default(){
              return []
          }
      }
  },
  data () {
   return {
     isLoad: false,
   }
  },
  components:{
    Swiper, 
    SwiperItem
  },
  methods: {
    imageLoad(){
      // 不要多次发出事件，因为只要一个图片加载好就能知道图片高度
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>
<style scoped>
</style>