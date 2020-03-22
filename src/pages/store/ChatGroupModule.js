import fb from '../../js/firebase'
import firebase from 'firebase'
import * as db from './db'
import moment from 'moment'
const ChatGroupModule = {
  state: {
    chat_groups: null,
    group_members: null,
    group_messages: null
  },
  getters: {
    chat_groups: state=>state.chat_groups,
    group_members: state=>state.group_members,
    group_messages: state=>state.group_messages
  },
  mutations: {
    setChatGroups(state, payload) {
      state.chat_groups = payload
    },
    setGroupMembers(state, payload) {
      state.group_members = payload
    },
    setGroupMessages(state, payload) {
      state.group_messages = payload
    }
  },
  actions: {
    async sendLatestGroupMessage({dispatch}, payload) {
      var latest_message = payload.img == null ? payload.message : 'photo'
      try {
        var owner = null;
        await db.firegroups.child(fb.auth().currentUser.uid).child(payload.group_name).once('value', (snapshot) => {
          owner = snapshot.val().owner
        })
        await db.firegroups.child(fb.auth().currentUser.uid).child(payload.group_name).update({
          latest_message : latest_message
        })
        if(fb.auth().currentUser.uid != owner) {
          db.firegroups.child(owner).child(payload.group_name).update({
            latest_message : latest_message
          })
        }

        var members = await dispatch('getGroupMembers', payload.group_name)
        _.forEach(members, (member) => {
          if(fb.auth().currentUser.uid != member.uid) {
            db.firegroups.child(member.uid).child(payload.group_name).update({
              latest_message : latest_message
            })
          }
        })

      } catch (error) {
        console.log(error)
      }
    },
    getGroupMessages({commit}, payload) {
      var current_user = fb.auth().currentUser;
      db.firegroups.child(current_user.uid).child(payload).child('msgboard').on('value', (snapshot) => {
        var messages = snapshot.val()
        var group_messages = []
        _.forEach(messages, (message) => {
          message.type = message.sentby == current_user.uid ? 'sent' : 'received';
          message.name = message.sentby == current_user.uid ? current_user.displayName : 'friend name';
          message.date = moment(message.timestamp).format('MMMM Do dddd');
          group_messages.push(message)
        })
        commit('setGroupMessages', group_messages)
      }, (err) => {
        console.log(err)
      })
    },
    async sendGroupMessage({dispatch}, payload) {
      try {
        var owner = null;
        await db.firegroups.child(fb.auth().currentUser.uid).child(payload.group_name).once('value', (snapshot) => {
          owner = snapshot.val().owner
        })
        await db.firegroups.child(fb.auth().currentUser.uid).child(payload.group_name).child('msgboard').push({
          sentby: fb.auth().currentUser.uid,
          displayName: fb.auth().currentUser.displayName,
          avatar: fb.auth().currentUser.photoURL,
          image: payload.img,
          text: payload.message,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        })
        if(fb.auth().currentUser.uid != owner) {
          db.firegroups.child(owner).child(payload.group_name).child('msgboard').push({
            sentby: fb.auth().currentUser.uid,
            displayName: fb.auth().currentUser.displayName,
            avatar: fb.auth().currentUser.photoURL,
            image: payload.img,
            text: payload.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          })
        }

        var members = await dispatch('getGroupMembers', payload.group_name)
        _.forEach(members, (member) => {
          if(fb.auth().currentUser.uid != member.uid) {
            db.firegroups.child(member.uid).child(payload.group_name).child('msgboard').push({
              sentby: fb.auth().currentUser.uid,
              displayName: fb.auth().currentUser.displayName,
              avatar: fb.auth().currentUser.photoURL,
              image: payload.img,
              text: payload.message,
              timestamp: firebase.database.ServerValue.TIMESTAMP
            })
          }
        })

      } catch (error) {
        console.log(error)
      }
    },
    async leaveGroup({dispatch}, payload) {
      try {
        var owner = null;
        await db.firegroups.child(fb.auth().currentUser.uid).child(payload.group_name).once('value', (snapshot) => {
          owner = snapshot.val().owner
        })

        var member_ref = db.firegroups.child(owner).child(payload.group_name).child('members');
        member_ref.orderByChild('uid').equalTo(fb.auth().currentUser.uid).once('value', (snapshot) => {
          let memberkey;
          for(var key in snapshot.val()) memberkey = key
          member_ref.child(memberkey).remove()
        })
        await db.firegroups.child(fb.auth().currentUser.uid).child(payload.group_name).remove()
        await dispatch('getGroupMembers', payload.group_name)

      } catch (error) {
        console.log(error)
      }
    },
    async removeMember({dispatch}, payload) {
      try {
        var member_ref = db.firegroups.child(fb.auth().currentUser.uid).child(payload.group_name).child('members')
        member_ref.orderByChild('uid').equalTo(payload.member.uid).once('value', (snapshot) => {
          let memberkey;
          for(var key in snapshot.val()) memberkey = key
          member_ref.child(memberkey).remove()
        })
        await db.firegroups.child(payload.member.uid).child(payload.group_name).remove()
        await dispatch('getGroupMembers', payload.group_name)
      } catch (err) {
        console.log(err)
      }
    },
    async getGroupMembers({commit}, group_name) {
      var owner = null;
      await db.firegroups.child(fb.auth().currentUser.uid).child(group_name).once('value', (snapshot) => {
        owner = snapshot.val().owner
      })
      var promise = new Promise((resolve, reject) => {
        db.firegroups.child(owner).child(group_name).once('value', (snapshot) => {
          var members = snapshot.val().members
          var groupmembers = []
          for(var key in members) {
            groupmembers.push(members[key])
          }
          resolve(members)
          commit('setGroupMembers', groupmembers)
        }, (err) => {
          reject(err)
        });
      })
      return promise
    },
    async addMembers({dispatch}, payload) {
      try {
        await db.firegroups.child(fb.auth().currentUser.uid).child(payload.group_name).child('members').push(payload.newmember)
        var url = await dispatch('getGroupImage', payload.group_name)
        await db.firegroups.child(payload.newmember.uid).child(payload.group_name).set({
          group_pic: url,
          msgboard: '',
          owner: fb.auth().currentUser.uid
        })
        dispatch('getGroupMembers', payload.group_name)
      } catch (error) {
        console.log(error)
      }
    },
    getGroupImage({}, group_name) {
      var promise = new Promise((resolve, reject) => {
        db.firegroups.child(fb.auth().currentUser.uid).child(group_name).once('value', (snapshot) => {
          var group_pic = snapshot.val().group_pic;
          resolve(group_pic)
        }).catch( (err) => {
          reject(err)
        })
      })  
      return promise
    },
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
              owner: groups[key].owner,
              latest_message: groups[key].latest_message
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