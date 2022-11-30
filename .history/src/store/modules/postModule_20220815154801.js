import axios from 'axios';

export default {
  actions: {},
  mutations: {},
  state: {
    posts: []
  },
  getters: {
    async getPosts(state) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=21"
      );
      state.posts = await response.data;
      return state.posts
    }
  },
}