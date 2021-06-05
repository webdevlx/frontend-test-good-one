import axios from 'axios'

export default {
  actions: {
    fetchCategories(context) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/categories')
          .then(response => {
            context.commit('UPDATE_CATEGORIES', response.data)
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
    UPDATE_CATEGORIES(state, data) {
      state.categories = data
    }
  },
  state: {
    categories: []
  },
  getters: {
    getCategories(state) {
      return state.categories
    }
  }
}
