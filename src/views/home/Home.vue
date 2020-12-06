<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick" ref='tabControl1' class='tab-control' v-show='isTabFixed'/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick" ref='tabControl2'/>
      
      <good-list :goods="showGoods"/>
      <back-top @click.native="backTop" v-show="showBackTop"/>
    </scroll>
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import { getHomeBanners,getHomeRecommends,getHomeGoods } from "plugins/home"
  import {debounce} from 'components/common/utils/utils'

  import {backTopMixin} from "commons/mixin"
  import {BACKTOP_DISTANCE} from "commons/const"

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    mixins: [backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {list: []},
          'new': {list: []},
          'sell': {list: []},
        },
        currentType: 'pop',
        tabOffset:0,
        isTabFixed:false,
        saveY:0,
        itemImageListener:null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeBanners()
      this.getHomeRecommends()
      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.itemImageListener = ()=>{
        refresh()
      }
      this.$bus.$on('itemImageLoad',this.itemImageListener)
    },
    activated(){
      this.$refs.scroll.scrollTo(0,-this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      this.saveY = this.$refs.scroll.y
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    methods: {
      getHomeBanners(){
        getHomeBanners().then(res=>{
          this.banners = res.data
        })
      },
      getHomeRecommends(){
        getHomeRecommends().then(res=>{
         this.recommends = res.data
        })
      },
      getHomeGoods(type){
        // const page = this.goods[type].page + 1
        getHomeGoods(type).then(res=>{
          this.goods[this.currentType].list = res.data
          this.goods[type].list.push(...res.data)
          this.$refs.scroll.finishPullUp()
        })
      },
      swiperImageLoad(){
        this.tabOffset = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
          default:
            this.currentType = 'pop'
        }  
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position) {
        this.showBackTop = (-position.y) > 1000
        this.isTabFixed = (-position.y) > this.tabOffset
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      
    }
  }
</script>

<style scoped>
 
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  
</style>
