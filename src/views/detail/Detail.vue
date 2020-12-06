<template>
  <div id="detail">  
    <detail-nav-bar @itemClick="titleClick" :current-index="currentIndex" class='detail-nav' ref='nav'></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
      <div>
        <detail-swiper ref="base" :images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :goods-images="goodsImages" @imagesLoad="detailImagesLoad"></detail-goods-info>
        <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
        <detail-recommend-info ref="recommend" :recommend-list="recommendList"></detail-recommend-info>
      </div>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="showBackTop"/>
  </div>
</template>

<script>
  import Scroll from 'common/scroll/Scroll'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailRecommendInfo from './childComps/DetailRecommendInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import {debounce} from 'components/common/utils/utils'
  import BackTop from 'content/backTop/BackTop'

  import {getDetailImages,getDetailInfo,Goods,Shop,getShopInfo,getGoodsInfo,GoodsParam} from "plugins/detail";
  import {backTopMixin} from "commons/mixin"
  import {BACKTOP_DISTANCE} from "commons/const"

  export default {
		name: "Detail",
    components: {
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendInfo,
      DetailBottomBar,
		  Scroll,
		  DetailNavBar,
      DetailSwiper,
      BackTop
    },
    mixins: [backTopMixin],
    data() {
		  return {
		    goodsId: '',
		    topImages: [],
        goods: {},
        shop: {},
        paramInfo: {},
        commentInfo: {},
        recommendList: [],
        themeTops: [],
        currentIndex: 0,
        columns:[],
        services:[],
        score:[],
        goodsImages:[],
        itemParams:{},
        itemImageListener:{},
        _getOffsetTops:null
      }
    },
    created() {
      this._getDetailData()
      this._getOffsetTops = debounce(()=> {
          this.themeTops = []
          this.themeTops.push(0)
          this.themeTops.push(this.$refs.param.$el.offsetTop-44)
          this.themeTops.push(this.$refs.comment.$el.offsetTop-44)
          this.themeTops.push(this.$refs.recommend.$el.offsetTop-44)
          this.themeTops.push(Number.MAX_VALUE)
        },200)
    },
    mounted(){
      let newRefresh = debounce(this.$refs.scroll.refresh,200)
      this.itemImageListener = ()=>{
        newRefresh()
      }
      this.$bus.$on('itemImageLoad',this.itemImageListener)
    },
    updated() {

    },
    activated(){
        this._getDetailData()
    },
    methods: {
      loadMore(){
        console.log('上拉')
      },
      detailImagesLoad(){
        this.$refs.scroll.refresh()
        this._getOffsetTops()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100)
      },
		  _getDetailData() {
		    // 1.获取goodsId
        const goodsId = this.$route.query.goodsId
        this.goodsId = goodsId

        this.score = [
          {name:'描述相符',score:4.9,isBetter:true},
          {name:'价格合理',score:4.9,isBetter:true},
          {name:'质量满意',score:4.9,isBetter:true}
        ]
        getShopInfo(goodsId).then(res=>{
          this.shop = new Shop(res.data[0],this.score)
        })
        getDetailImages(goodsId).then(res => {
          this.topImages = res.data
        })
        getGoodsInfo(goodsId).then(res => {
          this.goodsImages = res.data
        })  
        this.columns = ['销量86','收藏14人','默认快递']
        this.servicess = [
          // {icon:'duihao.svg',name:'延误必赔'},
          {icon:'duihao.svg',name:'退货补运费'},
          {icon:'duihao.svg',name:'全国包邮'},
          {icon:'duihao.svg',name:'7天无理由退货'},
          {icon:'duihao.svg',name:'72小时发货'},
        ]
        getDetailInfo(goodsId).then(res => {
          this.detailInfo = res.data[0]
          // 2.3.获取商品信息
          this.goods = new Goods(this.detailInfo, this.columns, this.servicess);
        })
        this.itemParams = {
          info:{
            anchor:'product_info',
            key:'产品参数',
            image:'',
            set:[
              {key:'图案',value:'宫廷复古图'},
              {key:'厂名',value:'服饰有限公司'},
              {key:'颜色',value:'黑白拼接'},
              {key:'袖型',value:'常规袖'},
              {key:'上衣厚度',value:'适中'},
              {key:'尺码',value:'XL,L,M,XXL'},
              ]
              },
          rule:{
              tables:{
                tr1:{
                  // td:['尺码','M','L','XL'], 
                  td:['尺码','M','L','XL'], 
                },
                tr2:{
                  td:['肩宽','10','10','10'], 
                },
                tr3:{
                  td:['布衣','20','20','20'], 
                },
                tr4:{
                  td:['胸围','30','30','30'], 
                },
              }
            }
          }
        
        this.paramInfo = new GoodsParam(this.itemParams.info, this.itemParams.rule);
        this.commentInfo = {
          user:{
            avatar:'custom.jpg',
            uname:'棒棒糖闯江湖'
          },
          content:'刚好合适，物美价廉，衣服面料很好，穿着很舒服，版型也好看，非常棒',
          created:'1581999991',
          style:'颜色 上衣+裤子 尺码：M',
          images:['1.jpg','2.jpg','3.jpg']
          }
        this.recommendList = [
          {goodsId:1,title:'新款甜美两件套菱形格子针织百褶连衣裙',price:'￥449.00',imgsrc:'1.jpg',cfav:'666'},
          {goodsId:2,itle:'马甲针织衬衫两件套装',price:'￥449.00',imgsrc:'2.jpg',cfav:'999'},
          {goodsId:3,title:'秋季新款宽松阔腿垂感显瘦',price:'￥449.00',imgsrc:'3.jpg',cfav:'666'},
          {goodsId:4,title:'秋季新款修身收腰纽扣百褶',price:'￥449.00',imgsrc:'4.jpg',cfav:'888'}
        ]  
      },
      contentScroll(position){
        let nowPosition = -position.y
        let length = this.themeTops.length 

        for(let i = 0; i < length-1; i++){
          if(this.currentIndex!==i && (this.themeTops[i] <= nowPosition && this.themeTops[i+1] > nowPosition)){
            this.currentIndex = i
          }
        } 
        
        if(nowPosition>BACKTOP_DISTANCE){
          this.showBackTop =true
        }
        
        // for(let i = 0; i < length; i++){
        //   if((this.currentIndex!==i)
        //     &&  (( length > i && ( this.themeTops[i] <= nowPosition && this.themeTops[i+1] > nowPosition) ) 
        //     || (length-1 ===i && this.themeTops[i]<=nowPosition))){
        //     this.currentIndex = i
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }  
      },
      addToCart() {
        // 1.创建对象
        const obj = {}
        // 2.对象信息
        obj.goodsId = this.detailInfo.goodsId
        obj.imgURL = this.detailInfo.imgsrc
        obj.title = this.detailInfo.title
        obj.desc = this.detailInfo.desc
        obj.newPrice = this.detailInfo.newPrice
        console.log(this.detailInfo)
        // 3.添加到Store中
        this.$store.dispatch('addCart', obj).then((res)=>{
          this.$toast.showToast(res)
          // console.log(this.$toast)
        })
      },
    }
  }
            
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;

    height: 100vh;
    background-color: #fff;
  }
  .detail-nav{
    position: relative;
    background-color: #fff;
    z-index:9;
  }
  .content {
    height:calc(100% - 44px - 49px);
    background-color: #fff;
    overflow: hidden;
  }

  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style>
