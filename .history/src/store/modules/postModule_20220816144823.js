import axios from 'axios';

export default {
  state: {
    posts: [],
    isPostLoading: false,
    selectedSortOption: '',
    sortOptions: [
      { value: "title", name: "По названию" },
      { value: "body", name: "По описанию" },
    ],
    currentPage: 1,
    postsOnPage: 5,
    totalPostsLength: 0,
  },

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
    },
    async getSortedPosts(state, selectedSortOption) {
      await state.commit('setSortedPosts', selectedSortOption)
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
    },
    setSortedPosts(state, selectedSortOption) {
      const posts = [...state.posts];
      return posts.sort((post1, post2) => {
        console.log(post1, post2)
        return post1[selectedSortOption]?.localeCompare(
          post2[selectedSortOption]
        );
      });
    }
  },

  getters: {
    getPosts(state) {
      state.isPostLoading = true;
      return state.posts;
    },
  },
}