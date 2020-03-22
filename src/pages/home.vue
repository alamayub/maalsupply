<template>
  <f7-page name="home" @page:beforein="initHome">

    <f7-navbar>
      <f7-nav-title style="color: teal;">MaalSupply</f7-nav-title>
      <f7-nav-right>
        <f7-link href="/requests/">
          <f7-icon size="20" f7="person_2_alt">
            <f7-badge color="red" v-show="friend_requests.length >= 1">{{ friend_requests.length }}</f7-badge>
          </f7-icon>
        </f7-link>
        <f7-link icon-f7="plus" icon-size="20" href="/contacts/"></f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-list style="margin: 0px;" media-list>
      <f7-list-item v-for="(friend, index) in friends" :key="index" :title="friend.name" :text="friend.latest_message" @click="gotoChat(friend)">
        <img slot="media" :src="friend.photo_url" width="44" height="44" style="border-radius: 50%;" />
      </f7-list-item>
    </f7-list>
   
  </f7-page>
</template>

<script>
import fb from '../js/firebase'
import { mixin } from '../js/mixin'
import FastAverageColor from 'fast-average-color';
export default {
  mixins: [mixin],
  computed: {
    friends() {
      return this.$store.getters.friends
    },
    friend_requests() {
      return this.$store.getters.friend_requests
    }
  },
  created() {
    this.$store.dispatch('getMyRequests')
    this.$store.dispatch('getMyFriends')
  },
  methods: {
    gotoChat(frd) {
      var frd_string = JSON.stringify(frd)
      this.$f7router.navigate('/chat/'+encodeURIComponent(frd_string))
    },
    initHome() {
      this.$store.commit('setShowTabs', true)
    },
  }
}
</script>