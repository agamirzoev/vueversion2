import Router from 'vue-router';
// import MainPage from '@/pages/MainPage.vue';

// const routes = [
//   {
//     path: '/',
//     component: MainPage,
//   },
//   {
//     path: '/auth',
//     component: () => import('@/pages/AuthPage.vue'),
//   }
// ];

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

const router = new Router({
  routes,
})

export default router;
