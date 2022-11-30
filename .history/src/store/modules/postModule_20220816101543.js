import axios from 'axios';

export default {
  actions: {
    async fetchPosts(context) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=21"
      );
      console.log(await response.data)
      const posts = await response.data;
      setTimeout(() => {
        context.commit('updatePosts', posts)

      }, 2500)
    }
  },
  mutations: {
    updatePosts(state, posts) {
      state.isPostLoading = true
      state.isLoading = false
      state.posts = posts
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