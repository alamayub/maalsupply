<template>
  <f7-page name="groupinfo">
    <f7-navbar title="Group Information" back-link></f7-navbar>
    <f7-block-title v-if="group_members != null">{{ group_members.length }} new member{{ group_members.length > 1 ? 's' : '' }}</f7-block-title>
    <f7-block-title v-else>No Group Members</f7-block-title>
    <f7-list style="margin: 0px;">
      <f7-list-item v-for="(member, index) in group_members" :key="index" :title="member.name">
        <img slot="media" height="40" width="40" style="border-radius: 50%;" :src="member.photo_url" />
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
    group_members () {
      return this.$store.getters.group_members
    }
  },
  created() {
    this.group_name = this.$f7route.params.group_name
    this.$store.dispatch('getGroupMembers', this.group_name)
  },
}
</script>