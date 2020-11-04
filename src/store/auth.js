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
    async getUserId(ctx) {
      const user = await firebase.auth().currentUser
      console.log(user)
      const id = user ? user.uid : null
      if (id) {
        ctx.commit('user_id', user.uid)
      }
      return id
    },
    async logOut() {
      await firebase.auth().signOut()
    }
  }
}
