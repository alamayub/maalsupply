import fb from '../../js/firebase'
const AuthModule = {
  state: {
    signed_up: false,
    signed_in: false,
    photo_url: null,
    display_name: null,
    email: null
  },
  getters: {
    signed_up: state=>state.signed_up,
    signed_in: state=>state.signed_in,
    photo_url: state=>state.photo_url,
    display_name: state=>state.display_name,
    email: state=>state.email
  },
  mutations: {
    setSignedUp(state, payload) {
      state.signed_up = payload
    },
    setSignedIn(state, payload) {
      state.signed_in = payload
    },
    setPhotoURL(state, payload) {
      state.photo_url = payload
    },
    setDisplayName(state, payload) {
      state.display_name = payload
    },
    setEmail(state, payload) {
      state.email = payload
    },
  },
  actions: {
    signIn({commit}, payload) {
      fb.auth().signInWithEmailAndPassword(payload.email, payload.password).then( (user) => {
        fb.auth().onAuthStateChanged( (user) => {
          if(user.emailVerified) {
            commit('setSignedIn', true)
            commit('setDisplayName', user.displayName)
            commit('setPhotoURL', user.photoURL)
            commit('setEmail', user.email)
            //commit('setAlertMessage', `Welcome ${user.displayName}`)
          } else {
            commit('setSignedIn', false)
            commit('setAlertMessage', 'Please varify your email')
          }
        });
      })
      .catch( (err) => {
        commit('setAlertMessage', err)
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
          commit('setAlertMessage', err)
        })
      }).catch( (err) => {
          console.log(err.message)
          commit('setAlertMessage', err)
      })
    },
    sendVerification({commit}) {
      var user = fb.auth().currentUser
      user.sendEmailVerification().then( () => {
        commit('setAlertMessage', `A verification email has been to ${user.email}`)
      }).catch( (err) => {
        
      });
    },
    signOut({commit}) {
      fb.auth().signOut().then( () => {
        commit('setSignedIn', false)
      })
    }
  }
}
export default AuthModule