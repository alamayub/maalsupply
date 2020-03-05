import fb from '../../js/firebase'
import * as db from './db'
const ChatGroupModule = {
  state: {
    chat_groups: null
  },
  getters: {
    chat_groups: state=>state.chat_groups
  },
  mutations: {
    setChatGroups(state, payload) {
      state.chat_groups = payload
    }
  },
  actions: {
    createGroup({}, group) {
      var promise = new Promise((resolve, reject) => {
        db.firegroups.child(fb.auth().currentUser.uid).child(group.name).set({
          group_pic: group.pic,
          msgboard: '',
          owner: fb.auth().currentUser.uid
        }).then( (data)=> {
          resolve(true)
        }).catch( (err) => {
          reject(false)
        })
      })
      return promise
    },
    getMyGroups({commit}) {
      db.firegroups.child(fb.auth().currentUser.uid).once('value', (snapshot) => {
        var mygroups = []
        if(snapshot.val() != null) {
          var groups = snapshot.val()
          for(var key in groups) {
            var group = {
              name: key,
              pic: groups[key].group_pic,
              owner: groups[key].owner
            }
            mygroups.push(group)
          }
        }
        commit('setChatGroups', mygroups)
      })
    }
  },
}
export default ChatGroupModule