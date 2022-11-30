import Vue from 'vue';
import Vuex from 'vuex';
import post from '@/store/modules/postModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    post
  }
})