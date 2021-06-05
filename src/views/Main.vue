<template>
  <div>
    <!-- Categories -->
    <Categories />

    <!-- Products -->
    <Products />
  </div>
</template>

<script>
import Categories from "../components/Categories.vue";
import Products from "../components/Products.vue";
export default {
  components: {
    Categories,
    Products,
  },
};
</script>

<style scoped>
</style>
