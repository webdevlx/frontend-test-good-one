<template>
  <div>
    <div class="row">
      <div class="col-3">
        <div class="card my-3">
          <div class="card-body">
            <h5 class="card-title">Buyurtmalar haqida</h5>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              Umumiy qiymat <br />
              <strong>{{ getTotalPrice }} so'm</strong>
            </li>
            <li class="list-group-item">
              Chegirma qiymat <br />
              <strong>{{ getTotalDiscountPrice }} so'm</strong>
            </li>
            <li class="list-group-item">
              Elementlar <br />
              <strong>{{ getTotalItems }}</strong>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-9">
        <div class="d-grid my-3">
          <input type="text" v-model="payment" class="form-control" />
        </div>

        <div class="row">
          <div v-for="key in keys" :key="key" class="col-4 my-1">
            <div class="d-grid">
              <button @mouseup="payment += key" class="btn btn-outline-primary">
                {{ key }}
              </button>
            </div>
          </div>

          <div class="col-4 my-1">
            <div class="d-grid">
              <button
                :disabled="payment === ''"
                @mouseup="payment += '0'"
                class="btn btn-outline-primary"
              >
                0
              </button>
            </div>
          </div>
          <div class="col-4 my-1">
            <div class="d-grid">
              <button
                :disabled="payment === ''"
                @mouseup="payment += '00'"
                class="btn btn-outline-primary"
              >
                00
              </button>
            </div>
          </div>
          <div class="col-4 my-1">
            <div class="d-grid">
              <button @mouseup="payment = ''" class="btn btn-primary">C</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-grid my-3">
      <button @click="paymentRequest" class="btn btn-success">
        To'lov qilish
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      keys: ["7", "8", "9", "4", "5", "6", "1", "2", "3"],
      payment: "",
      surrender: 0,
    };
  },
  watch: {
    payment() {
      this.payment = this.payment
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{3})(\d{3})(\d{3})/g, "$1 $2 $3")
        .replace(/^(\d{2})(\d{3})(\d{3})/g, "$1 $2 $3")
        .replace(/^(\d{1})(\d{3})(\d{3})/g, "$1 $2 $3")
        .replace(/^(\d{3})(\d{3})/g, "$1 $2")
        .replace(/^(\d{2})(\d{3})/g, "$1 $2")
        .replace(/^(\d{1})(\d{3})/g, "$1 $2")
        .replace(/^(\d{3})/g, "$1")
        .substring(0, 11);
    },
  },
  computed: {
    ...mapGetters(["getTotalPrice", "getTotalDiscountPrice", "getTotalItems"]),
  },
  methods: {
    ...mapActions(["deleteAllDataBasket"]),
    paymentRequest() {
      this.payment = this.payment.split(" ").join("");
      if (this.payment === "") {
        alert("To'lov kiritilmadi!");
      } else {
        if (this.getTotalPrice > parseInt(this.payment)) {
          alert("To'lov miqdori yetarli emas!");
        } else if (this.getTotalPrice === parseInt(this.payment)) {
          alert("To'lov muvaffaqqiyatli amalga oshirildi!");
          this.$router.push("/");
          this.deleteAllDataBasket();
        } else {
          this.surrender = parseInt(this.payment) - this.getTotalPrice;
          alert(
            "To'lov muvaffaqqiyatli amalga oshirildi! Qaytim " +
              this.surrender +
              " so'm"
          );
          this.$router.push("/");
          this.deleteAllDataBasket();
        }
      }
    },
  },
};
</script>

<style scoped>
</style>