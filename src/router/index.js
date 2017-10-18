import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Sellers from '@/components/sellers/sellers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'goods',
          component: Goods
        },
        {
          path: 'ratings',
          component: Ratings
        },
        {
          path: 'sellers',
          component: Sellers
        }
      ]
    }
  ]
})
