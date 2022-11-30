<template>
  <button class="my-button" @click="btnHandler"> 
    <slot>

    </slot>
  </button>
</template>
<script>
export default {
  name: 'my-button',
  data() {
    return {
      isModalShow: true,
    }
  },
  methods: {
    btnHandler() {
      this.$emit('showModal', this.isModalShow);
      this.$emit('delete')
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
.my-button {
  padding: 10px;
  margin: 5px 0;
  border: 1px solid blue;
  color: blue;
  border-radius: 5px;
  max-width: 200px;
}
</style>