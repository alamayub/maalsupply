<template>
<f7-app :params="f7params" class="color-theme-teal text-color-teal">

  <f7-views tabs class="safe-areas" v-if="signed_in">
    <f7-toolbar tabbar labels bottom no-shadow v-show="show_tabbar">
      <f7-link tab-link="#view-home" tab-link-active icon-ios="f7:house_fill" icon-aurora="f7:house_fill" icon-md="material:home" text="Home"></f7-link>
      <f7-link tab-link="#view-chatgroups" icon-ios="f7:person_3_fill" icon-aurora="f7:person_3_fill" icon-md="material:group" text="Groups"></f7-link>
      <f7-link tab-link="#view-profile" icon-ios="f7:person_alt" icon-aurora="f7:person_alt" icon-md="material:person" text="Profile"></f7-link>
    </f7-toolbar>

    <f7-view id="view-home" main tab tab-active url="/"></f7-view>
    <f7-view id="view-chatgroups" name="chatgroups" tab url="/chatgroups/"></f7-view>
    <f7-view id="view-profile" name="profile" tab url="/editprofile/"></f7-view>
  </f7-views>

  <f7-view v-if="!signed_in" url="/signin/" :main="true"></f7-view>

</f7-app>
</template>
<script>
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';
  import fb from '../js/firebase'
  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          id: 'io.framework7.maalsupply', // App bundle ID
          name: 'MaalSupply', // App name
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

      }
    },
    
    computed: {
      show_tabbar () {
        return this.$store.getters.show_tabbar
      },
      signed_in () {
        return this.$store.getters.signed_in
      },
      image_url() {
        return this.$store.getters.image_url
      },
      display_name () {
        return this.$store.getters.display_name
      },
      files () {
        return this.$store.getters.files
      },
    },
    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
      });
    },
    mounted() {
      this.$f7ready((f7) => {
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
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