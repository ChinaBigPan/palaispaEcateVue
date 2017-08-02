import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 加载各个路由，暂时先不用懒加载
import Enrollment from '../components/enrollment/enrollment.vue';
import Main from '../components/main/main.vue';
import Popularize from '../components/popularize/popularize.vue';
import Treatment from '../components/treatment/treatment.vue';


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: Main
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
