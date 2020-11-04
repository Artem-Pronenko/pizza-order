import firebase from 'firebase/app'

export default {
  actions: {
    // eslint-disable-next-line no-unused-vars
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
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
    getUserId(ctx) {
      const user = firebase.auth().currentUser
      const id = user ? user.uid : null
      ctx.commit('user_id', user.uid)
      return id
    },
    async logOut() {
      await firebase.auth().signOut()
    }
  }
}
