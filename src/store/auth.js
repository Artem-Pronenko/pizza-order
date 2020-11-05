import firebase from 'firebase/app'

export default {
  actions: {
    // регистрация через firebase
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // запись пользователя в БД
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        await dispatch('nameDB', name)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // изменения имени, или добавления нового имени пользователя
    async nameDB({ dispatch, commit }, name) {
      try {
        const uid = await dispatch('getUserId')
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            name
          })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // получение id
    async getUserId(ctx) {
      const user = await firebase.auth().currentUser
      const id = user ? user.uid : null
      if (id) {
        ctx.commit('user_id', user.uid)
      }
      return id
    },
    // выход с аккаунта
    async logOut() {
      await firebase.auth().signOut()
    }
  }
}
