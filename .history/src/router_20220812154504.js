import Router from 'vue-router';
import MainPage from '@/pages/MainPage.vue';

const routes = [
  {
        path: '/',
        component: MainPage,
      },
      {
        path: '/auth',
        component: () => import('@/pages/AuthPage.vue'),
      }
]

const router = new Router({
  routes,
})

export default router;
