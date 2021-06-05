<template>
  <div class="row">
    <div
      class="col-md-3 col-sm-6 col-12 my-2"
      v-for="product in getProducts"
      :key="product.id"
      @mouseup="addProduct(product)"
    >
      <div class="div p-2 border rounded shadow small" style="cursor: pointer">
        <div style="height: 60px">{{ product.name }}</div>
        <p>
          Narxi: <strong>{{ product.price }} so'm</strong>
        </p>
        <div>
          Omborda bor: <strong>{{ product.remainder }}</strong> ta
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getProducts"]),
  },
  methods: {
    ...mapActions(["fetchProducts", "addProductToBasket"]),
    addProduct(product) {
      this.addProductToBasket({ product: product });
    },
  },
  mounted() {
    this.fetchProducts()
      .then(() => {
        console.log("Mahsulotlar yangilandi");
      })
      .catch(() => {
        console.log("Mahsulotlarni yangilashda xatolik yuz berdi");
      });
  },
};
</script>
