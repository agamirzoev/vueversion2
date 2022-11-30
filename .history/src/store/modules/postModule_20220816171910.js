import axios from 'axios';

export default {
  state: {
    posts: [],
    searchedPosts: [],
    isPostLoading: false,
    selectedSortOption: '',
    sortOptions: [
      { value: "title", name: "По названию" },
      { value: "body", name: "По описанию" },
    ],
    currentPage: 1,
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
    },
    async getSearchedPosts(state, searchQuery) {
      await state.commit('setSearchedPosts', searchQuery)
    },
    async getCurrentPage(state, currentPage) {
      await state.commit('setCurrentPage', currentPage)
    },
    async deletePost(state, postId) {
      await state.commit('deletePost', postId)
    }
  },

  mutations: {
    updatePosts(state, posts) {
      state.isPostLoading = true;
      state.isLoading = false;
      state.posts = posts;
    },
    addPost(state, post) {
      state.posts.push(post);
    },
    setSortedPosts(state, selectedSortOption) {
      state.posts = state.posts.sort((post1, post2) => {
        return post1[selectedSortOption]?.localeCompare(
          post2[selectedSortOption]
        );
      });
    },
    setSearchedPosts(state, searchQuery) {
      console.log(searchQuery)
      if(searchQuery.trim()) {
        state.searchedPosts = state.posts
        return
      }
      state.searchedPosts = state.posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      state.currentPage = 1;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
      console.log(currentPage)
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId)
    }
  },

  getters: {
    getPosts(state) {
      state.isPostLoading = true;
      return state.posts;
    },
  },
}