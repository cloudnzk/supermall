<template>
  <!-- ref 如果是绑定在组件中的，那么通过this.$refs.refname 获取到的是一个组件对象-->
  <!-- ref 如果是绑定在普通的元素中，那么通过this.$refs.refname 获取到的是一个元素对象-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        data() {
            return {
                scroll: null
            };
        },
        mounted(){
            // 为什么不用document.querySelector('.content')？
            // 因为项目可能存在同类名的元素，可能会拿错
            this.scroll = new BScroll(this.$refs.wrapper,{
                
            })
        },
        methods: {},
    };
</script>
<style scoped>
</style>