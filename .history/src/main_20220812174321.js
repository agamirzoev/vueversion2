import Vue from 'vue';
import App from './App.vue';
import routes from '@/routes';
import VueRouter from 'vue-router';
import components from '@/components/UI';

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
})

components.forEach((component) => {
  Vue?.component(component.name, component);
})

const app = new Vue({
  components,
  router,
  render: h => h(App),
});


app.$mount('#app');
