<template>
  <select class="select" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option
      v-for="option in $store.state.post.sortOptions"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "my-select",
  data() {
    return {
      getSortedPosts: [],
    }
  },
  computed: {
    ...mapGetters(["getSortedPosts"]),
  },
  mounted() {
    console.log(this.$store.state.post.sortOptions)
  },
  methods: {
    changeOption(e) {
      // this.$emit('updateOptionValue', e.target.value)
      this.$store.getters('getSortedPosts', e.target.value)
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