<template>
  <f7-page name="home">

    <!--<f7-navbar no-shadow>
      <f7-nav-left>
        <f7-button round popup-open=".demo-popup-swipe">
          <f7-icon size="20" f7="plus"></f7-icon>
        </f7-button>
      </f7-nav-left>
      <f7-nav-title style="color: teal;">ThoughtsMaker</f7-nav-title>
      <f7-nav-right>
        <f7-link href="/request/">
          <f7-icon f7="persons">
            <f7-badge color="red">5</f7-badge>
          </f7-icon>
        </f7-link>
        <f7-link icon-f7="plus" href="/contact/"></f7-link>
      </f7-nav-right>
    </f7-navbar>-->
    <f7-navbar no-shadow>
      <f7-nav-title style="color: teal;">ThoughtsMaker</f7-nav-title>
      <f7-nav-right>
        <f7-link href="/signin/">
          login
        </f7-link>
        <f7-link href="/signup/">
          Reg
        </f7-link>
      </f7-nav-right>
    </f7-navbar>

    <p>Some messages</p>
  </f7-page>
</template>

<script>
import { fb, db } from '../js/firebase'
export default {
  computed: {
    
  }
}
</script>