<template>
  <f7-page name="addmembers">
    <f7-navbar title="Add Mebers" back-link></f7-navbar>
    
    <f7-list style="margin: 0px;">
      <f7-list-item swipeout v-for="(member, index) in p_members" :key="index" :title="member.name">
        <img slot="media" height="40" width="40" style="border-radius: 50%;" :src="member.photo_url" />
        <f7-swipeout-actions right>
          <f7-swipeout-button color="teal" @click="addMember(member)">Add Member</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      group_name: null
    }
  },
  computed: {
    p_members() {
      const self = this
      var friends = [...this.$store.getters.friends]
      _.forEach(self.group_members, (member) => {
        const index = _.findIndex(friends, member)
        friends.splice(index, 1)
      })
      return friends
    },
    group_members () {
      return this.$store.getters.group_members
    }
  },
  async created() {
    this.group_name = this.$f7route.params.group_name
    this.$store.dispatch('getGroupMembers', this.group_name)
  },
  methods: {
    addMember(member) {
      var payload = {}
      payload.newmember = member
      payload.group_name = this.group_name
      this.$store.dispatch('addMembers', payload)
    }
  }
}
</script>