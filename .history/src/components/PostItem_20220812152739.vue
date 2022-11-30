<template>
  <div>
    <div class="post-text__box">
      <div class="post-title"><strong> Название: </strong> {{ post.title }}</div>
      <div>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="deletePost">Удалить</my-button>
      <!-- <my-button @click="editPost">Редактировать</my-button> -->
    </div>
  </div>
</template>
<script>
export default {
  emits: ['delete'],
  data() {
    return {
    }
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deletePost() {
      this.$emit("delete", this.$props.post.id);
    },
  },
};
</script>
<style scoped>
  .post-text__box {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .post-title {
    width: 1000px;
    text-overflow: ellipsis;
  }
  .post__btns {
    display: flex;
    flex-direction: column;
    place-content: space-evenly;
  }
</style>