<template>
  <div class="row">
    <div class="col-12 py-2 bg-light text-center text-secondary">
      <div class="display-6" style="letter-spacing: 10px; text-decoration: underline">
        SAVAT
      </div>
    </div>

    <div class="col-12" v-if="getBasketProducts.length > 0">
      <div
        v-for="basketProduct in getBasketProducts"
        :key="basketProduct.id"
        class="my-2 small p-3 border rounded"
      >
        <div class="my-2">{{ basketProduct.name }}</div>
        <div class="d-flex align-items-center">
          <button
            @click="openModal(basketProduct)"
            type="button"
            class="btn btn-sm btn-success me-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Chegirma
          </button>
          <button
            @click="basketProduct.quantity -= 1"
            :disabled="basketProduct.quantity === 1"
            class="btn btn-sm btn-outline-primary mx-2"
          >
            -
          </button>
          <span class="bg-light">{{ basketProduct.quantity }}</span>
          <button
            @click="basketProduct.quantity += 1"
            :disabled="basketProduct.quantity === basketProduct.remainder"
            class="btn btn-sm btn-outline-primary mx-2"
          >
            +
          </button>
          <button
            @click="removeProduct(basketProduct)"
            class="btn btn-sm btn-danger ms-2"
          >
            O'chirish
          </button>
        </div>
        <div class="my-2">
          Omborda qoldi:
          <strong>{{ basketProduct.remainder - basketProduct.quantity }}</strong> ta
        </div>
        <div>
          Qiymat:
          <strong>{{ (basketProduct.quantity * basketProduct.price * (100 - basketProduct.discount)) / 100 }} so'm</strong>
        </div>
        <div>
          Chegirma:
          <strong>{{ (basketProduct.quantity * basketProduct.price * basketProduct.discount) / 100 }} so'm</strong>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="alert alert-secondary">Savatingiz bo'sh</div>
    </div>

    <div v-if="getBasketProducts.length > 0">
      <div class="d-flex justify-content-between my-2">
        <div>Umumiy qiymat</div>
        <div>
          <strong>{{ getTotalPrice }} so'm</strong>
        </div>
      </div>
      <div class="d-flex justify-content-between my-2">
        <div>Chegirma qiymat</div>
        <div>
          <strong>{{ getTotalDiscountPrice }} so'm</strong>
        </div>
      </div>
      <div class="d-flex justify-content-between my-2">
        <div>Elementlar</div>
        <div>
          <strong>{{ getTotalItems }}</strong>
        </div>
      </div>

      <div class="d-grid my-3">
        <router-link class="btn btn-primary" to="/payment">To'lovni amalga oshirish</router-link>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Chegirma oynasi</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form>
            <div class="modal-body">
              <h5>{{ product.name }} mahsuloti uchun chegirma</h5>
              <input type="number" v-model.number="product.discount" /> %
              <h5>Savatdagi umumiy mahsulotlar uchun chegirma</h5>
              <input type="number" v-model.number="discount" /> %
            </div>
            <div class="modal-footer">
              <input
                @click="saveDiscount"
                type="submit"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                value="Chegirmani saqlash"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      product: {},
      discount: 0,
    };
  },
  computed: {
    ...mapGetters([
      "getBasketProducts",
      "getTotalPrice",
      "getTotalDiscountPrice",
      "getTotalItems",
    ]),
  },
  methods: {
    ...mapActions(["removeProductFromBasket", "addDiscount"]),
    removeProduct(product) {
      this.removeProductFromBasket({ product: product });
    },
    openModal(product) {
      this.product = product;
    },
    saveDiscount() {
      if (
        this.product.discount <= 100 &&
        this.discount <= 100 &&
        this.product.discount >= 0 &&
        this.discount >= 0 &&
        this.product.discount !== "" &&
        this.discount !== ""
      ) {
        this.addDiscount({ discount: this.discount });
      } else {
        this.product.discount = 0;
        this.discount = 0;
        alert("Chegirma foizi xato kiritilgan!");
      }
    },
  },
};
</script>

<style scoped>
</style>
