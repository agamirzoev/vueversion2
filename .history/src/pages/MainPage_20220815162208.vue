<template>
  <div>
    <div class="addpostbtnbox">
      <my-button class="add-post__btn" @showModal="showModal">
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
    <my-modal v-model="isModalShow" :isModalShow="isModalShow" @showModal="showModal">
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
// import axios from "axios";
import { mapGetters } from 'vuex';
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
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
        // { id: 1, title: "Vue", body: "Vue - JS framework for creating UI" },
        // { id: 2, title: "Vue 2", body: "Vue 2 - JS framework for creating UI" },
        // { id: 3, title: "Vue 3", body: "Vue 3 - JS framework for creating UI" },
      ],
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
      const posts = [...this.posts];
      return posts.sort((post1, post2) =>
          post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
        );
    },
    sortedAndSearchedPosts() {
      const result = this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      return result;
    },
    sortedAndSearchedAndPaginatedPosts() {
      const start = (this.currentPage - 1) * this.postsOnPage;
      const end = start + this.postsOnPage;
      return this.sortedAndSearchedPosts.slice(start, end);
    },
    ...mapGetters(['getPosts']),
  },
  watch: {
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
  async mounted() {
    await this.$store.dispatch('fetchPosts');
    await console.log(this.getPosts)
  },
  methods: {
    createPost(post) {
      this.posts.push({
        title: post.title,
        body: post.body,
        id: Date.now(),
      });
      this.isModalShow = false;
      this.currentPage = Math.ceil(this.posts.length / 5);
      console.log(this.currentPage)
    },
    deletePost(id) {
      this.posts = this.posts.filter((item) => item.id !== id);
    },
    showModal(isModalShow) {
      this.isModalShow = isModalShow;
    },
    getCurrentPagePosts(currentPage) {
      this.currentPage = currentPage;
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