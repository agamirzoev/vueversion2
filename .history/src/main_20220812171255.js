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
  console.log(Vue.component)
  Vue.component(component.name, component);
})

const app = new Vue({
  router,
  render: h => h(App),
});

console.log(app.prototype)

app.$mount('#app');
