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
      <my-select />
    </div>
    <my-modal
      v-model="isModalShow"
      :isModalShow="isModalShow"
      @showModal="showModal"
    >
      <post-form :posts="posts" @create="createPost" />
    </my-modal>
    <post-list
      :posts="paginatedPosts"
      :totalPostsLength="totalPostsLength"
      v-model="$store.state.post.currentPage"
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
import { mapGetters } from "vuex";
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
      posts: [],
      isModalShow: false,
      isPostLoading: false,
      modificatorValue: "",
      searchQuery: "",
      // selectedSortOptions: '',
      postsOnPage: 5,
      totalPostsLength: 0,
    };
  },
  computed: {
    paginatedPosts() {
      const start = (this.$store.state.post.currentPage - 1) * this.postsOnPage;
      const end = start + this.postsOnPage;
      return this.$store.state.post.posts.slice(start, end);
    },
    ...mapGetters(["getPosts"]),
  },
  watch: {
    sortedAndSearchedAndPaginatedPosts() {
      const start = (this.$store.state.post.currentPage - 1) * this.postsOnPage;
      const end = start + this.postsOnPage;
      return this.$store.state.post.posts.slice(start, end);
    },
  },
  async mounted() {
    console.log(this.$store.state.post.posts)
    await this.$store.dispatch("fetchPosts");
    this.posts = await this.$store.state.post.posts;
  },
  methods: {
    createPost(post) {
      this.$store.commit("addPost", {
        title: post.title,
        body: post.body,
        id: Date.now(),
      });
      this.isModalShow = false;
      this.$store.dispatch("getCurrentPage", Math.ceil(this.posts.length / 5))
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