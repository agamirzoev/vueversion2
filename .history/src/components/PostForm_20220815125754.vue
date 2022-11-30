<template>
  <form @submit.prevent="createPost" class="form">
    <div class="form-inputs-box">
      <my-input
        v-model="post.title"
        :nput="titleHandler"
        type="text"
        placeholder="Введите название"
      />
      <my-input
        v-model="post.body"
        :nput="bodyHandler"
        type="text"
        placeholder="Введите описание"
      />
    </div>
    <my-button 
      @click="createPost"
      class="add-post-btn"
    >
      Добавить пост
    </my-button>
    <div v-if="this.error" class="error">{{ this.error }}</div>
  </form>
</template>

<script>

export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
        id: this.posts,
      },
      error: '',
    }
  },
  emits: ['create'],
  methods: {
    createPost() {
      if(this.post.title.trim() === '') {
        this.error = 'Fill post title field!';
        setTimeout(() => this.error = '', 2000);
        return;
      }
      if(this.post.body.trim() === '') {
        this.error = 'Fill post body field!';
        setTimeout(() => this.error = '', 2000);
        return;
      }
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
      }
    },
    titleHandler(value) {
      this.post.title = value
    },
    bodyHandler(value) {
      this.post.body = value
    },
  },
  watch: {
    post: {
      handler(newValue, oldValue) {
        console.log(newValue)
        console.log(oldValue)
      },
      deep: true,
    }
  }
};
</script>

<style scoped>

.form {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.form-inputs-box {
  max-width: 1000px;
  width: 100%;
}

.error {
  color: red
}

</style>