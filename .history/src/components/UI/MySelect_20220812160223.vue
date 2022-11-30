<template>
  <select class="select" v-model="selectedOption" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>
<script>
export default {
  name: "my-select",
  data() {
    return {
      selectedOption: this.$props.modelValue,
    }
  },
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
};
</script>
<style scoped>
.select {
  min-width: fit-content;
  width: 150px;
  height: 38px;
  border: 1px solid blue;
  border-radius: 5px;
  place-self: center;
}
</style>