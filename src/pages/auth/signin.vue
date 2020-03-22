<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title>Login</f7-login-screen-title>
    <f7-list form>
      <f7-list-input label="Email" type="email" placeholder="Your email" :value="email" @input="email = $event.target.value"></f7-list-input>
      <f7-list-input label="Password" type="password" placeholder="Your password" :value="password" @input="password = $event.target.value"></f7-list-input>
<<<<<<< HEAD
      <f7-button style="margin: 10px 15px;" fill round @click="signIn">Sign In</f7-button>
=======
    </f7-list>
    <f7-list>
      <f7-button style="margin: auto 15px;" fill round @click="signIn">Sign In</f7-button>
>>>>>>> 1668696ff75c849aa149c76d5ae8953423176db0
      <f7-block-footer>
        Don't have an account?<f7-link href="/signup/">&nbsp;&nbsp;SignUp</f7-link><br>
        <f7-link @click="forgetPassword">Forget password?</f7-link>
      </f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
  import fb from '../../js/firebase'
  import { mixin } from '../../js/mixin'
  export default {
    mixins: [mixin],
    data() {
      return {
        email: null,
        password: null,
      };
    },
    methods: {
      forgetPassword() {
        const self = this
        if(this.email != null) {
          fb.auth().sendPasswordResetEmail(this.email).then( () => {
            self.$store.commit('setAlertMessage', 'Please check your email to reset password')
          }).catch( (err) => {
            self.$store.commit('setAlertMessage', err.message)
          });
        } else {
          self.$store.commit('setAlertMessage', 'Please enter your email')
        }
      },
      signIn() {
        const self = this;
        var payload= {}
        payload.email = this.email
        payload.password = this.password
        this.$store.dispatch('signIn', payload)
      },
    },
  };
</script>
