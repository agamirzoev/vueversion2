<template>
  <div v-if="posts.length > 0">
    <h2 class="postlist__header">Cписок постов:</h2>
    <transition-group name="post-list" class="transition">
      <post-item
        class="post"
        v-for="post in posts"
        v-bind:key="post.id"
        :post="post"
        @delete="deletePost"
      />
    </transition-group>
    <div class="pagination-btns__box">
      <button
        v-for="(index) in Math.ceil(this.totalPostsLength / 5)"
        v-bind:key="index"
        @click="getCurrentPage"
        v-bind:class="`${setCurrentPageClass(index)}`"
      >
        {{ index }}
      </button>
    </div>
  </div>
  <div v-else>
    <h2 class="postlist__header">Cписок постов пуст!</h2>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem.vue";

export default {
  components: {
    PostItem,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  mounted() {
    // console.log(this.$props.posts)
  },
  methods: {
    deletePost(id) {
      this.$emit("delete", id);
    },
    getCurrentPage(e) {
      this.currentPage = +(e.target.textContent);
      this.$emit("getCurrentPage", this.currentPage);
    },
    setCurrentPageClass(index) {
      return index === this.currentPage ? "pagination-btn__active" : "pagination-btn";
    }
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    totalPostsLength: {
      type: Number,
      required: true,
    }
  },
};
</script>

<style scoped>
.postlist__header {
  text-align: center;
  margin: 5px 0;
}
.post {
  padding: 15px;
  border: 2px solid blue;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}
.post-list {
  position: absolute;
}
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: cubic-bezier(0.77, 0, 0.175, 1)
}
.post-list-move {
  transition: transform 0.8s ease;
}
.pagination-btns__box {
  display: flex;
  justify-content: center;
}
.pagination-btns__box>button {
  width: 30px;
  height: 30px;
  margin-right: 3px;
  border: 1px solid grey;
  border-radius: 4px;
}
.pagination-btn {
  background-color: white;
}
.pagination-btn:hover {
  background-color: rgba(34, 65, 243, 0.781);
}
.pagination-btn__active {
  background-color: greenyellow;
}
.pagination-btn__active:hover {
  background-color: rgba(0, 128, 28, 0.541);
}
</style>