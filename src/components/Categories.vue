<template>
  <div class="row">
    <div class="col-md-3 col-sm-6 col-12 my-2 d-grid">
      <button
        class="p-2 btn btn-primary border rounded text-center"
        @click="loadProductsByCategoryID('')"
      >
        Barchasi
      </button>
    </div>
    <div
      class="col-md-3 col-sm-6 col-12 my-2 d-grid"
      v-for="category in getCategories"
      :key="category.id"
    >
      <button
        class="p-2 btn btn-success border rounded text-center"
        @click="loadProductsByCategoryID(category.id)"
      >
        {{ category.name }}
      </button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getCategories"]),
  },
  methods: {
    ...mapActions(["fetchCategories", "fetchProducts"]),
    loadProductsByCategoryID(id) {
      this.fetchProducts({ categoryID: id });
    },
  },
  mounted() {
    this.fetchCategories()
      .then(() => {
        console.log("Kategoriyalar yangilandi");
      })
      .catch(() => {
        console.log("Kategoriyalarni yangilashda xatolik yuz berdi");
      });
  },
};
</script>
