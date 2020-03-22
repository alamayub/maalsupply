<template>
  <f7-page name="newgroup">
    <f7-navbar style="color: teal;" title="New Group" back-link></f7-navbar>
    <div class="wrapper">
      <img class="image-cover" :src="group_image_url" @click="launchFilePicker">
      <input accept="image/*" type="file" ref="file" style="display: none;" @change="onFilePicked">
    </div>
    <f7-list form>
      <f7-list-input label="Group Name" type="text" placeholder="Your Group Name" :value="group_name" @input="group_name = $event.target.value"></f7-list-input>
      <f7-button style="margin: auto 15px;" outline fill @click="createGroup">Create New Group</f7-button>
    </f7-list>
  </f7-page>
</template>

<script>
  import { mixin } from '../../js/mixin'
  export default {
    mixins: [mixin],
    data() {
      return {
        group_name: 'New Group',
      };
    },
    computed: {
      group_image_url () {
        return this.$store.getters.group_image_url
      },
      files () {
        return this.$store.getters.files
      },
    },
    methods: {
      launchFilePicker() {
        this.$refs.file.click();
      },
      onFilePicked () {
        this.$store.dispatch('readFile', 'setGroupImageURL')
      },
      async createGroup() {
        var group = {}
        group.name = this.group_name
        group.pic = this.group_image_url
        console.log(group)
        if(this.files) group.pic = await this.$store.dispatch('uploadFile', 'group_profile/')
        this.$store.dispatch('createGroup', group)
      },
      created() {
        var url = 'https://cdn0.iconfinder.com/data/icons/social-media-glyph-1/64/Facebook_Social_Media_User_Interface-39-512.png'
        this.$store.commit('setGroupImageURL', )
      }
    },
  };
</script>


<style scoped>
.wrapper {
  text-align: center;
}
.image-cover {
width: 150px;
height: 150px;
border-radius: 50%;
margin: 20px;
object-fit: cover;
object-position: center;
}
</style>