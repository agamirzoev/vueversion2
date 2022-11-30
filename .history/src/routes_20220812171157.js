import VueRouter from 'vue-router';
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

const router = new VueRouter({
  routes,
})

export default router;
