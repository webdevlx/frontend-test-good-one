import Vue from 'vue'
import Vuex from 'vuex'
import categories from './plugins/categories'
import products from './plugins/products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basketProducts: [],
    discount: 0
  },
  mutations: {
    ADD_PRODUCT(state, product) {
      let i = 0;
      while (state.basketProducts[i]) {
        if (state.basketProducts[i].id === product.id) {
          if (state.basketProducts[i].remainder !== state.basketProducts[i].quantity) {
            state.basketProducts[i].quantity += 1;
          } else {
            alert("Ushbu mahsulot omborda qolmadi!");
          }
          return;
        }
        i++;
      }
      state.basketProducts.push(product)
    },
    REMOVE_PRODUCT(state, product) {
      let i = 0;
      while(state.basketProducts[i]) {
        if(state.basketProducts[i].id === product.id) {
          state.basketProducts.splice(i, 1);
          return
        }
        i++;
      }
    },
    SAVE_DISCOUNT(state, discount) {
      state.discount = discount
    },
    DELETE_ALL_DATA_BASKET(state) {
      state.basketProducts = [],
      state.discount = 0
    }
  },
  actions: {
    addProductToBasket(context, options) {
      context.commit('ADD_PRODUCT', options.product)
    },
    removeProductFromBasket(context, options) {
      context.commit('REMOVE_PRODUCT', options.product)
    },
    addDiscount(context, options) {
      context.commit('SAVE_DISCOUNT', options.discount)
    },
    deleteAllDataBasket(context) {
      context.commit('DELETE_ALL_DATA_BASKET')
    }
  },
  getters: {
    getBasketProducts(state) {
      return state.basketProducts
    },
    getTotalPrice(state) {
      let totalPrice = 0;
      let i = 0;
      while(state.basketProducts[i]) {
        totalPrice = totalPrice + (state.basketProducts[i].price * state.basketProducts[i].quantity * (100 - state.basketProducts[i].discount) / 100); 
        i++;
      }
      totalPrice = totalPrice * ((100 - state.discount) / 100);

      return totalPrice;
    },
    getTotalDiscountPrice(state) {
      let totalDiscountPrice = 0;
      let totalPrice = 0;
      let i = 0;
      while(state.basketProducts[i]) {
        totalPrice = totalPrice + (state.basketProducts[i].price * state.basketProducts[i].quantity * (100 - state.basketProducts[i].discount) / 100);
        totalDiscountPrice = totalDiscountPrice + (state.basketProducts[i].price * state.basketProducts[i].quantity * (state.basketProducts[i].discount) / 100); 
        i++;
      }
      totalDiscountPrice +=  totalPrice * (state.discount) / 100;

      return totalDiscountPrice;
    },
    getTotalItems(state) {
      return state.basketProducts.length
    }
  },
  modules: {
    categories,
    products
  }
})
