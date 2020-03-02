<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title>Login</f7-login-screen-title>
    <f7-list form>
      <f7-list-input label="Email" type="email" placeholder="Your email" :value="email" @input="email = $event.target.value"></f7-list-input>
      <f7-list-input label="Password" type="password" placeholder="Your password" :value="password" @input="password = $event.target.value"></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-button style="margin: auto 15px;" fill round @click="signIn">Sign In</f7-button>
      <f7-block-footer>
        <f7-link>Resend Confirmation Email</f7-link><br>
        Don't have an account?<f7-link href="/signup/">&nbsp;&nbsp;SignUp</f7-link><br>
        <f7-link>Forget password?</f7-link>
      </f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
  export default {
    data() {
      return {
        email: null,
        password: null,
      };
    },
    methods: {
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
