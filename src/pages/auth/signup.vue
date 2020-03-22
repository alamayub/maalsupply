<template>
  <f7-page no-toolbar no-swipeback>
    <f7-navbar title="Register" style="color: teal;"></f7-navbar>
    <div class="wrapper">
      <img class="image-cover" :src="image_url" @click="launchFilePicker">
      <input accept="image/*" type="file" ref="file" style="display: none;" @change="onFilePicked">
    </div>
    <f7-list form>
      <f7-list-input label="Name" type="text" placeholder="Your name" :value="name" @input="name = $event.target.value"></f7-list-input>
      <f7-list-input label="Email" type="email" placeholder="Your email" :value="email" @input="email = $event.target.value"></f7-list-input>
      <f7-list-input label="Password" type="password" placeholder="Your password" :value="password" @input="password = $event.target.value"></f7-list-input>
      <f7-button style="margin: 10px 15px;" fill round @click="signUp">Sign Up</f7-button>
      <f7-block-footer>
        Already have an account?<f7-link href="/signin/">&nbsp;&nbsp;login</f7-link><br>
      </f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
  import { mixin } from '../../js/mixin'
  export default {
    mixins: [mixin],
    data() {
      return {
        name: null,
        email: null,
        password: null,
      };
    },
    watch: {
      signed_up(value) {
        if(value === true) {
          this.$f7router.navigate('/signin/')
        }
      }
    },
    computed: {
      image_url () {
        return this.$store.getters.image_url
      },
      files () {
        return this.$store.getters.files
      },
      signed_up () {
        return this.$store.getters.signed_up
      }
    },
    methods: {
      launchFilePicker() {
        this.$refs.file.click();
      },
      onFilePicked () {
        this.$store.dispatch('readFile', 'setImageURL')
      },
      signUp() {
        const self = this;
        var payload= {}
        payload.name = this.name
        payload.email = this.email
        payload.password = this.password
        payload.image_url = this.image_url
        if(self.files) {
          self.$store.dispatch('uploadFile').then( (url) => {
            payload.photoURL = url
            self.$store.dispatch('signUp', payload)
          })
        } else {
          this.$store.dispatch('signUp', payload)
        }
        
      },
    },
    created() {
      this.$store.commit('setSignedUp', false)
    }
  };
</script>
