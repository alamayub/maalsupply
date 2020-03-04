<template>
  <f7-page name="contact">
    <f7-navbar title="All Contacts" back-link="Back" style="color: teal;"></f7-navbar>
    <f7-block class="friends no-border">

      <f7-list style="margin: 0px;">
        <f7-list-item swipeout v-for="(contact, index) in contacts" :key="index" :title="contact.name">
          <img slot="media" :src="contact.photo_url" />
          <f7-swipeout-actions right>
            <f7-swipeout-button color="teal" @click="addFriend(contact)">Add</f7-swipeout-button>
          </f7-swipeout-actions>
        </f7-list-item>
      </f7-list>

    </f7-block>
  </f7-page>
</template>


<script>
import fb from '../../js/firebase'
export default {
  data  () {
    return {
    }
  },
  computed: {
    contacts() {
      return this.$store.getters.contacts
    }
  },
  created() {
    return this.$store.dispatch('getAllUsers')
  },
  methods: {
    addFriend(contact) {
      var request = {}
      request.sender = fb.auth().currentUser.uid
      request.receipent = contact.uid
      this.$store.dispatch('sendRequest', request)
      this.$store.commit('setAlertMessage', `Friend request send to ${contact.name}`)
    }
  }
}
</script>

<style scoped>
.friends {
margin: 0px; 
padding: 0px;
}
.friends img {
height: 40px;
width: 40px;
border-radius: 50%;
}
</style>