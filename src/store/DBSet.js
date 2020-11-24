import firebase from 'firebase'

export default {
  state: {
    userName: ''
  },
  mutations: {
    USER_NAME(state, userName) {
      state.userName = userName
    }
  },
  getters: {
    getName(state) {
      return state.userName
    }
  },
  actions: {
    // обновление & добавление заказов
    async addOrder(ctx, [object]) {
      console.log(object.userId)
      const orderArr = await ctx.dispatch('getPizzaOrder', object.userId)
      orderArr.push(object)
      await firebase
        .firestore()
        .collection('order')
        .doc(object.userId)
        .set({orderArr})
    },
    // получение имени пользователя
    async getUserName(ctx, userID) {
      const result = await firebase.database().ref(`/users/${userID}`)
      result.on('value', snapshot => {
        ctx.commit('USER_NAME', snapshot.val().info.name)
      })
    },
    // добавление новой пиццы
    async addedPizza(ctx, object) {
      try {
        await firebase
          .firestore()
          .collection(`${object.collection}`)
          .doc(`${object.name}`)
          .set(object)
      } catch (e) {
        throw new Error(e)
      }
    },
    async deletePizza(ctx, object) {
      try {
        await firebase
          .firestore()
          .collection(`${object.collection}`)
          .doc(`${object.name}`)
          .delete()
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
