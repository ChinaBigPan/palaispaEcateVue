import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 加载各个路由，暂时先不用懒加载
import Enrollment from '../components/enrollment/enrollment.vue';
import Main from '../components/main/main.vue';
import Treatment from '../components/treatment/treatment.vue';
import Palaispastore from '../components/palaispastore/palaispastore.vue';

// 加载main首页的子路由
import BrandSpirit from '../components/brandSpirit/brandSpirit.vue';
import BrandHistory from '../components/brandHistory/brandHistory.vue';
import PromotionVideo from '../components/promotionVideo/promotionVideo.vue';

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main/brandSpirit'
    },
    {
      path: '/main',
      redirect: '/main/brandSpirit'
    },
    {
      name: 'main',
      path: '/main',
      component: Main,
      children: [
        {
          name: 'brandSpirit',
          path: 'brandSpirit',
          component: BrandSpirit
        },
        {
          name: 'brandHistory',
          path: 'brandHistory',
          component: BrandHistory
        },
        {
          name: 'promotionVideo',
          path: 'promotionVideo',
          component: PromotionVideo
        }
    ]
    },
    {
      name: 'treatment',
      path: '/treatment',
      component: Treatment
    },
    {
      name: 'enrollment',
      path: '/enrollment',
      component: Enrollment
    },
    {
      name: 'palaispastore',
      path: '/palaispastore',
      component: Palaispastore
    }
  ]
})
