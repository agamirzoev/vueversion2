import axios from 'axios';

export default {
  actions: {
    async fetchPosts(context) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=21"
      );
      const posts = await response.data;
      console.log(posts)
      context.commit('updatePosts', posts)
    }
  },
  mutations: {
    updatePosts(state, posts) {
      console.log(posts)
      state.posts = posts
    }
  },
  state: {
    posts: [],
    isLoading: false
  },
  getters: {
    async getPosts(state) {
      state.isLoading = true;
      console.log(state.isLoading)
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=21"
      );
      state.posts = await response.data;
      console.log(state.posts);
      return state.posts;
    }
  },
}