import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 加载各个路由，暂时先不用懒加载
import Enrollment from '../components/enrollment/enrollment.vue';
import Main from '../components/main/main.vue';
import Popularize from '../components/popularize/popularize.vue';
import Treatment from '../components/treatment/treatment.vue';

// 加载main首页的子路由
import BrandSpirit from '../components/brandSpirit/brandSpirit.vue';
import BrandHistory from '../components/brandHistory/brandHistory.vue';
import PromotionVideo from '../components/promotionVideo/promotionVideo.vue';

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main/BrandSpirit'
    },
    {
      path: '/main',
      redirect: '/main/BrandSpirit'
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: 'brandSpirit',
          component: BrandSpirit
        },
        {
          path: 'brandHistory',
          component: BrandHistory
        },
        {
          path: 'promotionVideo',
          component: PromotionVideo
        }
    ]
    },
    {
      path: '/treatment',
      component: Treatment
    },
    {
      path: '/enrollment',
      component: Enrollment
    },
    {
      path: '/popularize',
      component: Popularize
    }
  ]
})
