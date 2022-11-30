<template>
  <button class="add-post-btn" @click="btnHandler"> 
    <slot>

    </slot>
  </button>
</template>
<script>
export default {
  name: 'my-button',
  data() {
    console.log(this.$props.showModal)
  },
  methods: {
    btnHandler() {
      // this.$emit('showModal', event.target)
    }
  },
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