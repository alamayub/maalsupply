<template>
  <f7-page name="requests">
    <f7-navbar title="All Friend Requests" back-link="Back" style="color: teal;"></f7-navbar>
    <f7-block class="friends no-border">
      <f7-list style="margin: 0px;">
        <f7-list-item swipeout v-for="(request, index) in friend_requests" :key="index" :title="request.name">
          <img slot="media" :src="request.photo_url" />
          <f7-swipeout-actions right>
            <f7-swipeout-button color="white" @click="confirm(request)">
              <f7-icon f7="person_crop_circle_badge_checkmark" color="teal"></f7-icon>
            </f7-swipeout-button>
            <f7-swipeout-button color="white" @click="remove(request)">
              <f7-icon f7="trash_circle_fill" color="red"></f7-icon>
            </f7-swipeout-button>
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
    friend_requests() {
      return this.$store.getters.friend_requests
    }
  },
  created() {
    this.$store.dispatch('getMyRequests')
  },
  methods: {
    confirm(request) {
      this.$store.dispatch('confirmRequest', request)
    },
    remove(request) {
      this.$store.dispatch('deleteRequest', request)
    },
  }
}
</script>

<style scoped>
.friends {
margin: 0px; 
padding: 0px;
}
.friends img {
height: 45px;
width: 45px;
border-radius: 50%;
}
</style>