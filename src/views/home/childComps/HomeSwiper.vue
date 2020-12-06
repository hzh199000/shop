<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a href="#">
        <img :src="getImgsrc(item.imgsrc)" @load='imgLoad'/>
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
        default() {
          return []
        }
      }
    },
    data(){
      return {
        isLoad:false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      getImgsrc(src){
        return require('assets/img/home/'+src)
      },
      imgLoad(){
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>
img{
   height:100%;
 } 
</style>
