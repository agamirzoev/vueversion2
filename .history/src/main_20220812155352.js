import Vue from 'vue';
import App from './App.vue';
import router from '@/router';

Vue.config.productionTip = false
const app = new Vue({
  render: h => h(App),
});

app.use(router);

app.$mount('#app');
