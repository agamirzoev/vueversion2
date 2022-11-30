import axios from 'axios';

export default {
  actions: {
    async fetchPosts(state) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=21"
      );
      const posts = await response.data;
      await state.commit('updatePosts', posts);
    },
    async addPostRequest(state, post) {
      await state.commit('addPost', post)
    }
  },
  mutations: {
    updatePosts(state, posts) {
      state.isPostLoading = true;
      state.isLoading = false;
      state.posts = posts;
    },
    addPost(state, post) {
      state.posts.push(post)
    }
  },
  state: {
    posts: [],
    isPostLoading: false,
  },
  getters: {
    async getPosts(state) {
      state.isPostLoading = true;
      return state.posts;
    },
  },
}