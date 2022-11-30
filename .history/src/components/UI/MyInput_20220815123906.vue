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
      inputValue: '',
    }
  },
  methods: {
    updateInput(event) {
      this.$emit("inputValue", event.target.value);
      this.inputValue = event.target.value;
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