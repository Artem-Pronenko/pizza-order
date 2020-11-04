import firebase from 'firebase'

export default {
  state: {
    pizza: [],
    pizzaComposition: []
  },
  mutations: {
    UPDATE_PIZZA(state, pizza) {
      state.pizza = pizza
    }
  },
  getters: {
    getPizza(state) {
      return state.pizza
    }
  },
  actions: {
    // получение заказов
    async getPizzaOrder(ctx, userId) {
      console.log('userId getPizzaOrder', userId)
      const result = await firebase
        .firestore()
        .collection('order')
        .doc(userId)
        .get()
      const data = result.data()
      return !data ? [] : data.orderArr
    },
    // получение всех активных пиц
    async getPizzaFB(ctx, collection) {
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
    // получение состава пиццы
    getPizzaComposition(ctx, options) {
      return firebase
        .firestore()
        .collection(`${options.collection}`)
        .doc(options.name)
        .get()
    }
  }
}
