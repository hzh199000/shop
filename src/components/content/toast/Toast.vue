<template>
    <div id='toast' v-show='isShow'>
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
  name:'Toast',
  data(){
   return {
    message:'',
    isShow:false
   }
  },
  methods:{
      showToast(message,duration=1500){
          this.message = message
          this.isShow = true
          setTimeout(() => {
            this.message = ''
            this.isShow = false
          }, duration);
      }
  }

}
</script>

<style scoped>
    #toast{
        position: fixed;
        top:50%;
        left:50%;
        border-radius: 40%;
        background-color:rgb(46, 44, 44);
        color:#fff;
        padding:8px 20px;
        transform:translate(-50%,-50%);
        z-index:99;
    }
</style>
