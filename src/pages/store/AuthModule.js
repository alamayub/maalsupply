import fb from '../../js/firebase'
const AuthModule = {
  state: {
    signed_up: false,
    signed_in: false
  },
  getters: {
    signed_up: state=>state.signed_up,
    signed_in: state=>state.signed_in
  },
  mutations: {
    setSignedUp(state, payload) {
      state.signed_up = payload
    },
    setSignedIn(state, payload) {
      state.signed_in = payload
    },
  },
  actions: {
    signIn({commit}, payload) {
      fb.auth().signInWithEmailAndPassword(payload.email, payload.password).then( (user) => {
        commit('setSignedIn', true)
      })
      .catch( (err) => {
        commit('setAlertMessage', err.message)
      });
    },
    signUp({commit, dispatch}, payload) {
      fb.auth().createUserWithEmailAndPassword(payload.email, payload.password).then( (data) => {
        fb.database().ref('users').child(data.user.uid).set({
          uid: data.user.uid,
          name: payload.name,
          email: payload.email,
          emailVerified: false,
          photo_url: payload.image_url
        });
        let newuser = data.user
        newuser.updateProfile({
          displayName: payload.name,
          photoURL: payload.photoURL
        }).then( () => {
          dispatch('sendVerification')
          commit('setSignedUp', true)
          console.log('profile updated')
        }).catch( (err) => {
          console.log(err.message)
          commit('setAlertMessage', err.message)
        })
      }).catch( (err) => {
          console.log(err.message)
          commit('setAlertMessage', err.message)
      })
    },
    sendVerification({commit}) {
      var user = fb.auth().currentUser
      user.sendEmailVerification().then( () => {
        commit('setAlertMessage', `A verification email has been to ${user.email}`)
      }).catch( (err) => {
        
      });
    }
  }
}
export default AuthModule