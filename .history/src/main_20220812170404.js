import Vue from 'vue';
import App from './App.vue';
// import router from '@/router';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import components from '@/components/UI';

Vue.config.productionTip = false

Vue.use(VueRouter);

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

components.forEach((component) => {
  Vue.component(component.name, component);
})

const app = new Vue({
  router,
  render: h => h(App),
});


app.$mount('#app');
