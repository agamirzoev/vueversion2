import axios from 'axios';

export default {
  actions: {
    async fetchPosts(context) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=21"
      );
      const posts = await response.data;
      await context.commit('updatePosts', posts)
    }
  },
  mutations: {
    updatePosts(state, posts) {
      state.isPostLoading = true
      setTimeout(() => {
        state.posts = posts
        state.isLoading = false
      }, 2500)
    }
  },
  state: {
    posts: [],
    isPostLoading: false
  },
  getters: {
    async getPosts(state) {
      state.isPostLoading = true;
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=21"
      );
      setTimeout(() => {
        state.posts = response.data
        state.isLoading = false
        console.log(state.posts, state.isLoading);
      }, 2500)
      // state.posts = await response.data;
      return state.posts;
    }
  },
}