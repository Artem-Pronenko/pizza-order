import firebase from 'firebase'

export default {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    // async updatePizza(ctx, object) {
    //   return await firebase
    //     .firestore()
    //     .collection(`${object.collection}`)
    //     .doc(object.name)
    //     .set(object)
    // },
    async addedPizza(ctx, object) {
      try {
        await firebase
          .firestore()
          .collection(`${object.collection}`)
          .doc(`${object.name}`)
          .set(object)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
