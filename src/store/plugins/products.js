import axios from 'axios'

export default {
  actions: {
    fetchProducts(context, options) {

      let id = ''

      if(options !== undefined) {
        if(options.categoryID !== '') {
					id = '?category_id=' + options.categoryID
				}
      }

      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/products' + id)
          .then(response => {
            context.commit('UPDATE_PRODUCTS', response.data)
						resolve()
          })
          .catch(error => {
            console.log('There was an error: ', error.response)
						reject()
          })
      })
    }
  },
  mutations: {
    UPDATE_PRODUCTS(state, data) {
      state.products = data
    }
  },
  state: {
    products: []
  },
  getters: {
    getProducts(state) {
      return state.products
    }
  }
}
