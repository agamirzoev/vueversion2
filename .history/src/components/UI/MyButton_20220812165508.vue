<template>
  <button @click="showModal" class="add-post-btn">
    <slot>

    </slot>
  </button>
</template>
<script>
export default {
  name: 'my-button',
  props: {
    showModal: {
      type: Function,
    }
  }
};
</script>
<style scoped>
.add-post-btn {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid blue;
  color: blue;
  border-radius: 5px;
  max-width: 200px;
}
</style>