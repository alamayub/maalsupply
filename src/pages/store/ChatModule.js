import fb from '../../js/firebase'
import * as db from './db'
const ChatModule = {
  state: {
    contacts: [],
    friends: [],
    friend_requests: []
  },
  getters: {
    contacts: state=>state.contacts,
    friends: state=>state.friends,
    friend_requests: state=>state.friend_requests
  },
  mutations: {
    setContacts(state, payload) {
      state.contacts = payload
    },
    setFriends(state, payload) {
      state.friends = payload
    },
    setFriendRequests(state, payload) {
      state.friend_requests = payload
    },
  },
  actions: {
    sendMessage({}, payload) {
      var promise = new Promise((resolve, reject) => {
        db.firechats.child(fb.auth().currentUser.uid).child(payload.friend.uid).push({ 
          sentby: fb.auth().currentUser.uid,
          text: payload.msg,
          image: payload.image,
          //timestamp: fb.database.ServerValue.TIMESTAMP,  //fb.firestore.FieldValue.serverTimestamp(),
          timestamp: fb.firestore.ServerValue.serverTimestamp(),
        }).then( () => {
          db.firechats.child(payload.friend.uid).child(fb.auth().currentUser.uid).push({
            sentby: fb.auth().currentUser.uid,
            text: payload.msg,
            image: payload.image,
            timestamp: fb.database().ServerValue.TIMESTAMP
          }).then( () => {
            resolve(true)
          }).catch( (err) => {
            reject(err)
          })
        })
      })
      return promise
    },
    confirmRequest({dispatch}, payload) {
      var promise = new Promise((resolve, reject) => {
        db.firefriends.child(fb.auth().currentUser.uid)
        .push({uid: payload.uid})
        .then( () => {
          db.firefriends.child(payload.uid)
          .push({ uid: fb.auth().currentUser.uid })
        }).then( () => {
          dispatch('deleteRequest', payload).then( () => {
            resolve(true)
          })
        }).catch( (err) => {
          reject(err)
        })
      })
      return promise
    },
    deleteRequest({}, payload) {
      var promise = new Promise((resolve, reject) => {
        db.firerequest.child(fb.auth().currentUser.uid).orderByChild('sender').equalTo(payload.uid).once('value', (snapshot) => {
          let userkey;
          for(var key in snapshot.val()) userkey = key
          db.firerequest.child(fb.auth().currentUser.uid).child(userkey).remove().then( () => {
            resolve(true)
          }).then( (err) => {
            reject(err)
          })
        }).catch( (err) => {
          reject(err)
        })
      })
      return promise
    },
    async getMyRequests({commit, dispatch}) {
      var users = await dispatch('getAllUsers')
      db.firerequest.child(fb.auth().currentUser.uid).on('value', (snapshot) => {
        var frd_request_id = _.map(snapshot.val(), "sender")
        var userdetails = []
        _.forEach(frd_request_id, (uid) => {
          var user = _.find(users, ["uid", uid])
          userdetails.push(user)
        })
        commit('setFriendRequests', userdetails)
      })
    },
    async getMyFriends({commit, dispatch}) {
      var users = await dispatch('getAllUsers')
      db.firefriends.child(fb.auth().currentUser.uid).on('value', (snapshot) => {
        var frds_id = _.map(snapshot.val(), "uid")
        var userdetails = []
        _.forEach(frds_id, (uid) => {
          var user = _.find(users, ["uid", uid])
          userdetails.push(user)
        })
        commit('setFriends', userdetails)
      })
    },
    getAllUsers({commit}) {
      var promise = new Promise((resolve, reject) => {
        fb.database().ref('users').on('value', (snapshot) => {
          commit('setContacts', snapshot.val())
          resolve(snapshot.val())
        })  
      })
      return promise
    },
    sendRequest({commit}, payload) {
      var promise = new Promise((resolve, reject) => {
        db.firerequest.child(payload.receipent).push({sender: payload.sender}).then( () => {
          resolve({success: true})
        }).catch( (err) => {
          reject(err)
        })
      })
      return promise
    }
  }
}
export default ChatModule