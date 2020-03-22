<template>
  <f7-page no-toolbar>
    <f7-navbar>
      <f7-nav-title style="color: teal;">Profile Setting</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-f7="arrow_right_circle_fill" @click="signOut"></f7-link>
      </f7-nav-right>
    </f7-navbar>
    <div class="wrapper">
      <img class="image-cover" :src="image_url" @click="launchFilePicker">
      <input accept="image/*" type="file" ref="file" style="display:none;" @change="onFilePicked">
    </div>     
  
    <f7-list>
      <f7-list-input label="Name" type="text" :value="display_name" @input="display_name = $event.target.value"></f7-list-input>
      <f7-list-input disabled label="Email" :value="email"></f7-list-input>
      <f7-button style="margin: 10px 15px;" fill round @click="updateProfile" >Update Profile</f7-button>
    </f7-list>
  </f7-page>
</template>

<script>
  import { mixin } from '../../js/mixin'
  import fb from '../../js/firebase'
  export default {
    mixins: [ mixin ],
    data() {
      return {
      };
    },
    computed: {
      display_name: {
        get:function() {
          return this.$store.getters.display_name
        },
        set:function(newValue) {
          this.$store.commit('setDisplayName', newValue)
        }
      },
      email() {
        return this.$store.getters.email
      },
      image_url() {
        return this.$store.getters.image_url
      },
      files () {
        return this.$store.getters.files
      },
      photo_url () {
        return this.$store.getters.photo_url
      },
    },
    methods: {
      launchFilePicker () {
        this.$refs.file.click();
      },
      onFilePicked () {
        this.$store.dispatch('readFile', 'setImageURL')
      },
      updateProfile() {
        const self = this
        var user = fb.auth().currentUser
        if(self.files) {
          if(this.photo_url != null) {
            var storage = fb.storage();
            var httpReference = storage.refFromURL(this.photo_url);
            httpReference.delete().then( () => {
              console.log('previous picture deleted')
            }).catch( (err) => {
              console.log(err)
            })
          }
          this.$store.dispatch('uploadFile', 'profile/').then( (url) => {
            user.updateProfile({
              displayName: self.display_name,
              photoURL: url
            }).then( () => {
              self.$store.commit('setPhotoURL', user.photoURL);
              self.$store.commit('setDisplayName', user.displayName);
              fb.database().ref('users/'+user.uid).update({
                photo_url: user.photoURL,
                name: user.displayName
              })
              self.$store.commit('setAlertMessage', 'Profile Updated')
            }).catch( (err) => {
              console.log(err)
            })
          })
        } else {
          user.updateProfile({
            displayName: self.display_name
          }).then( () => {
            self.$store.commit('setDisplayName', self.display_name)
            self.$store.commit('setAlertMessage', 'Profile Updated')
          })
        }
      },
      signOut () {
        const app = this.$f7
        this.$store.dispatch('signOut')
        app.panel.close()
      }
    },
    created() {
      if(this.photo_url != null) {
        this.$store.commit('setImageURL', this.photo_url)
      }
    },
  };
</script>