<template>
  <f7-page name="chatgroups">
    <f7-navbar style="color: teal;" title="All Chat Groups">
      <f7-nav-right>
        <f7-link icon-size="20" href="/newgroup/">
          <f7-icon ios="f7:person_badge_plus_fill" aurora="f7:person_badge_plus_fill" md="material:group_add"></f7-icon>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <f7-list style="margin: 0px;" media-list>
      <f7-list-item v-for="(group, index) in chat_groups" :key="index" :title="group.name" :text="group.latest_message" @click="gotoGroup(group)">
        <img slot="media" :src="group.pic" width="44" height="44" style="border-radius: 50%;" />
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
export default {
  computed: {
    chat_groups() {
      return this.$store.getters.chat_groups
    }
  },
  created() {
    this.$store.dispatch('getMyGroups')
  },
  methods: {
    gotoGroup(group) {
      console.log(group.name)
    }
  }
}
</script>