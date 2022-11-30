import axios from 'axios';

let posts;

function pause(delay, commit) {
  setTimeout(() => {
    console.log(commit)
    if(commit) {
      console.log(posts)
      commit('updatePosts', posts)
      console.log(delay)
    }
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
      posts = await response.data;
      pause(3000, context.commit)
      // await context.commit('updatePosts', posts)
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