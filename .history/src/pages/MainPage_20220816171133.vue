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
        @input="getSearchedPosts"
      />
      <my-select />
    </div>
    <my-modal
      v-model="isModalShow"
      :isModalShow="isModalShow"
      @showModal="showModal"
    >
      <post-form @create="createPost" />
    </my-modal>
    <post-list
      :posts="searchQuery.trim() ? $store.state.post.searchedPosts : paginatedPosts"
      :totalPostsLength="totalPostsLength"
      v-model="$store.state.post.currentPage"
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
      searchedPosts: [],
      isModalShow: false,
      isPostLoading: false,
      modificatorValue: "",
      searchQuery: "",
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
  async mounted() {
    await this.$store.dispatch("fetchPosts");
  },
  methods: {
    createPost(post) {
      this.$store.commit("addPost", {
        title: post.title,
        body: post.body,
        id: Date.now(),
      });
      this.isModalShow = false;
      this.$store.dispatch("getCurrentPage", Math.ceil(this.$store.state.post.posts.length / 5))
    },
    showModal(isModalShow) {
      this.isModalShow = isModalShow;
    },
    getCurrentPagePosts(currentPage) {
      this.currentPage = currentPage;
    },
    getSearchedPosts() {
      // console.log(this.searchQuery)
      // this.searchedPosts = state.posts.filter((post) =>
      //   post.title.toLowerCase().includes(searchQuery.toLowerCase())
      // );
      // state.currentPage = 1;
        console.log(!!this.searchQuery.trim())
      if (this.searchQuery.trim()) {
        this.$store.dispatch('getSearchedPosts', this.searchQuery.trim())
      }
    }
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