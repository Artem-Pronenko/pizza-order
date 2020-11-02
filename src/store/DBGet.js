import firebase from 'firebase'

export default {
  state: {
    pizza: [],
    pizzaComposition: []
  },
  mutations: {
    UPDATE_PIZZA(state, pizza) {
      state.pizza = pizza
    },
    GET_PIZZA_COMPOSITION(state, pizzaComposition) {
      state.pizzaComposition = pizzaComposition
    }
  },
  getters: {
    getPizza(state) {
      return state.pizza
    },
    getComposition(state) {
      return state.pizzaComposition
    }
  },
  actions: {
    async getPizza(ctx, collection) {
      const pizzaArr = []
      const result = await firebase
        .firestore()
        .collection(collection)
        .get()
      result.forEach(doc => {
        pizzaArr.push(doc.data())
      })
      ctx.commit('UPDATE_PIZZA', pizzaArr)
    },
    getPizzaComposition(ctx, options) {
      return firebase
        .firestore()
        .collection(`${options.collection}`)
        .doc(options.name)
        .get()
      //ctx.commit('GET_PIZZA_COMPOSITION', result.data().composition)
    }
  }
}
