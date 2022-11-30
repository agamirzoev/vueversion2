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

const compon = components.map((component) => {
  return Vue.component(component.name, component);
})

const app = new Vue({
  components: compon[0],
  router,
  render: h => h(App),
});

components.forEach((component) => {
  Vue?.component(component.name, component);
})

app.$mount('#app');
