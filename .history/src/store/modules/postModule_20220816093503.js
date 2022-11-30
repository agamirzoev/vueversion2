import axios from 'axios';

export default {
  actions: {
    async fetchPosts(context) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=21"
      );
      console.log(await response.data)
      const posts = await response.data;
      await context.commit('updatePosts', posts)
    }
  },
  mutations: {
    updatePosts(state, posts) {
      state.isPostLoading = true
      state.posts = posts
      state.isLoading = false
      // setTimeout(() => {
      // }, 2500)
    }
  },
  state: {
    posts: [],
    isPostLoading: false
  },
  getters: {
    async getPosts(state) {
      state.isPostLoading = true;
      console.log(state.posts);
      return state.posts;
    }
  },
}