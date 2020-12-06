<template>
  <div>
    <swiper class="detail-swiper" v-if="images.length">
      <swiper-item class="item" v-for="(item, index) in images" :key="index">
        <img :src="getImgsrc(item.imgsrc)" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

	export default {
		name: "DetailSwiper",
    components: {
		  Swiper,
      SwiperItem
    },
    props: {
		  images: {
		    type: Array,
        default() {
		      return []
        }
      }
    },
    methods:{
      getImgsrc(src){
        return require('assets/img/detail/'+src)
      }
    }
  }
</script>

<style scoped>
  .item {
    text-align: center;
    height: 300px;
  }
</style>
