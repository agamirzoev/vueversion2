<template>
  <button class="add-post-btn" @click="click">
    <slot>

    </slot>
  </button>
</template>
<script>
export default {
  name: 'my-button',
  data() {
    console.log(this.$props.click)
  },
  props: {
    click: {
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