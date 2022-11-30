<template>
  <div>
    <div class="addpostbtnbox">
      <my-button class="add-post__btn" @click="showModal">
        Добавить пост
      </my-button>
      <input
        class="post-search"
        type="text"
        placeholder="Введите название"
        v-model="searchQuery"
      />
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-modal v-model="isModalShow">
      <post-form :posts="posts" @create="createPost" />
    </my-modal>
    <post-list
      :posts="sortedAndSearchedAndPaginatedPosts"
      :totalPostsLength="totalPostsLength"
      v-model="currentPage"
      @getCurrentPage="getCurrentPagePosts"
      @delete="deletePost"
      v-if="!isPostLoading"
    />
    <div v-else class="loader">
      Посты загружаются.
      <hr />
      Пожалуйста, подождите
      <pulse-loader :loading="isPostLoading" color="blue" />
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-v-model-argument */
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  components: {
    PostList,
    PostForm,
    PulseLoader,
  },
  data() {
    return {
      posts: [
        { id: 1, title: "Vue", body: "Vue - JS framework for creating UI" },
        { id: 2, title: "Vue 2", body: "Vue 2 - JS framework for creating UI" },
        { id: 3, title: "Vue 3", body: "Vue 3 - JS framework for creating UI" },
      ],
      sortedPosts: [],
      sortedAndSearchedPosts: [],
      sortedAndSearchedAndPaginatedPosts: [],
      isModalShow: false,
      isPostLoading: false,
      modificatorValue: "",
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
      ],
      searchQuery: "",
      currentPage: 1,
      postsOnPage: 5,
      totalPostsLength: 0,
    };
  },
  computed: {
    sortedPosts() {
      const result = [
        ...this.posts.sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        ),
      ];
      return result;
    },
    sortedAndSearchedPosts() {
      const result = this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.totalPostsLength = result.length;
      this.currentPage = 1;
      return result;
    },
    sortedAndSearchedAndPaginatedPosts() {
      const start = (this.currentPage - 1) * this.postsOnPage;
      const end = start + this.postsOnPage;
      return this.sortedAndSearchedPosts.slice(start, end);
    },
  },
  watch: {
    // sortedPosts() {
    //   const result = [
    //     ...this.posts.sort((post1, post2) =>
    //       post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
    //     ),
    //   ];
    //   return result;
    // },
    // sortedAndSearchedPosts() {
    //   const result = this.sortedPosts.filter((post) =>
    //     post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    //   );
    //   this.totalPostsLength = result.length;
    //   this.currentPage = 1;
    //   return result;
    // },
    // sortedAndSearchedAndPaginatedPosts() {
    //   const start = (this.currentPage - 1) * this.postsOnPage;
    //   const end = start + this.postsOnPage;
    //   return this.sortedAndSearchedPosts.slice(start, end);
    // },
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    createPost(post) {
      this.posts.push({
        title: post.title,
        body: post.body,
        id: Date.now(),
      });
      this.isModalShow = false;
    },
    deletePost(id) {
      this.posts = this.posts.filter((item) => item.id !== id);
    },
    showModal() {
      this.isModalShow = true;
    },
    getCurrentPagePosts(currentPage) {
      this.currentPage = currentPage;
    },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=21"
        );
        this.posts = response.data;
        setTimeout(() => {
          this.isPostLoading = false;
        }, 2000);
      } catch (e) {
        alert(e);
      }
    },
  },
};
</script>

<style scoped>
.addpostbtnbox {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}
.add-post__btn {
  place-self: center;
}
.post-search {
  min-width: fit-content;
  width: 150px;
  height: 38px;
  border: 1px solid blue;
  border-radius: 5px;
  place-self: center;
  padding: 10px;
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  place-items: center;
}
</style>