<template>
  <div v-if="goodsImages.length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">新款上市</div>
      <div class="end"></div>
    </div>
    <div class="info-key">穿着效果</div>
    <div class="info-list">
      <img v-for="(item, index) in goodsImages" :src="getImgsrc(item.imgsrc)" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      goodsImages: {
        type: Array
      }
    },
    data(){
      return {
        counter:0,
        imagesLength:0
      }
    },
    methods:{
      getImgsrc(src){
        return require('assets/img/goodsImages/'+src)
      },
      imgLoad(){
        if(++this.counter === this.imagesLength){
          this.$emit('imagesLoad')
        }
      }
    },
    watch:{
      goodsImages(){
        this.imagesLength = this.goodsImages.length
      }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
