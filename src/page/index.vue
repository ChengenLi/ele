<template>
  <div class="index">
    <v-header :seller="seller"></v-header>
    <ul class="tab border-1px">
      <li class="tab-item"><router-link class="link" to='/goods' append>商品</router-link></li>
      <li class="tab-item"><router-link class="link" to='/ratings' append>评价</router-link></li>
      <li class="tab-item"><router-link class="link" to='/sellers' append>商家</router-link></li>
    </ul>
   <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import header from '@/components/header/header'

const ERROK = 0

export default {
  name: 'index',
  data () {
    return {
      seller: {}
    }
  },
  components: {'v-header': header},
  created () {
    this.$http.get('/api/seller').then((response) => {
      response = response.data
      if (response.errno === ERROK) {
        this.seller = response.data
      }
    })
  }
}
</script>

<style lang="less">
 @import '../common/less/index.less';
  .index .tab{
      display: flex;
      width: 100%;
      line-height: 40px;
      .border-1px(rgba(7,17,27,0.1));
      .tab-item{
        flex: 1;
        height: 40px;
        text-align: center;
        .link{
          display: block;
          font-size: 14px;
          color: rgb(77,85,93);
        }
        .router-link-active{
          color: rgb(240,20,20);
        }
      }

  }
</style>
