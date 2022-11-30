<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>
<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
  },
  data() {
    return {
      post: {
        title: '',
        value: '',
      },
    }
  },
  methods: {
    updateInput(event) {
      if(event.target.getAttribute('class') === 'input sda') {
        this.post.title = event.target.value
        this.$emit("titleValue", this.post.title);
      }
      this.post.body = event.target.value
      this.$emit("bodyValue", this.post.body);
    },
  },
};
</script>
<style scoped>
.input {
  width: 90%;
  border: 1px solid blue;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  max-width: 600px;
}
</style>