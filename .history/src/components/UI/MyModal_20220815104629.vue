<template>
  <div class="modal" v-if="this.$props.isModalShow" @click.stop="hideDialog">
    <div @click.stop class="modal__content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "my-modal",
  data() {
    console.log(this.$props.isModalShow)
    return {
      isShow: this.$props.isModalShow
    }
  },
  methods: {
    hideDialog() {
      console.log(2132)
      this.$emit('q', false)
    }
  },
  props: {
    isModalShow: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
<style scoped>

  .modal {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0, 0.5);
    position: fixed;
    display: flex;
  }

  .modal__content {
    margin: auto;
    border-radius: 6px;
    background-color: white;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
  }

</style>