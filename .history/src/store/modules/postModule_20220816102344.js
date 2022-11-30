import axios from 'axios';

function pause(delay) {
  setTimeout(() => {
    console.log(delay)
  }, delay);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(0);
    }, delay);
  });
}

export default {
  actions: {
    async fetchPosts(context) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=21"
      );
      console.log(await response.data)
      pause(2000)
      const posts = await response.data;
      await context.commit('updatePosts', posts)
    }
  },
  mutations: {
    updatePosts(state, posts) {
      state.isPostLoading = true
      pause(2000)
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
      pause(2000)
      console.log(state.posts);
      return state.posts;
    }
  },
}