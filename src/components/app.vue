<template>
<f7-app :params="f7params" class="color-theme-teal text-color-teal">
  <!-- Right panel with reveal effect-->
  <f7-panel right reveal>
    <f7-view>
      <f7-page>
        <f7-navbar no-shadow style="color: teal;" title="DJ Snake"></f7-navbar>
        <f7-block>
          kux aayega isme vi...
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>

  <f7-views tabs class="safe-areas" v-if="signed_in">
    <f7-toolbar tabbar labels bottom no-shadow>
      <f7-link tab-link="#view-home" tab-link-active icon-ios="f7:house_fill" icon-aurora="f7:house_fill" icon-md="material:home" text="Home"></f7-link>
      <f7-link tab-link="#view-profile" icon-ios="f7:person_alt" icon-aurora="f7:person_alt" icon-md="material:person" text="Profile"></f7-link>
    </f7-toolbar>

    <f7-view id="view-home" main tab tab-active url="/"></f7-view>
    <f7-view id="view-allphotos" name="allphotos" tab url="/allphotos/"></f7-view>
    <f7-view id="view-friends" name="friends" tab url="/friends/"></f7-view>
    <f7-view id="view-profile" name="profile" tab url="/editprofile/"></f7-view>
  </f7-views>

  <f7-view v-if="!signed_in" url="/signin/" :main="true"></f7-view>

</f7-app>
</template>
<script>
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';
  import { fb, db } from '../js/firebase'

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          id: 'io.framework7.thoughtsmaker', // App bundle ID
          name: 'ThoughtsMaker', // App name
          theme: 'auto', // Automatic theme detection
          // App root data
          data: function () {
            return {

            };
          },

          // App routes
          routes: routes,

          // Register service worker
          serviceWorker: Device.cordova ? {} : {
            path: '/service-worker.js',
          },
          // Input settings
          input: {
            scrollIntoViewOnFocus: Device.cordova && !Device.electron,
            scrollIntoViewCentered: Device.cordova && !Device.electron,
          },
          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },
        },
        //add post
        desc: null,
      }
    },
    
    computed: {
      signed_in () {
        return this.$store.getters.signed_in
      },
      image_url() {
        return this.$store.getters.image_url
      },
      files () {
        return this.$store.getters.files
      },
    },
    methods: {
      launchFilePicker () {
        this.$refs.file.click();
      },
      onFilePicked () {
        this.$store.dispatch('readFile')
      },
      post() {
        var user = fb.auth().currentUser
        const self = this
        var payload = {}
        payload.uid = user.uid
        payload.name = user.displayName
        payload.user_image = user.photoURL
        payload.email = user.email
        payload.photoURL = this.image_url
        payload.desc = this.desc
        if(self.files) {
          this.$store.dispatch('postImage').then( (url) => {
            payload.photoURL = url
            self.$store.dispatch('uploadPost', payload)
          })
        } else {
          this.$store.dispatch('uploadPost', payload)
        }
      },
    },
    mounted() {
      this.$f7ready((f7) => {
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
      });
    },
    mounted() {
      this.$f7ready((f7) => {
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
      });
    }
  }
</script>

<style>
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