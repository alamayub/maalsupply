export const mixin = {
  computed: {
    alert_message() {
      return this.$store.getters.alert_message
    }
  },
  watch: { 
    alert_message(value) {
      const self = this
      this.showToastButton(value)
      setTimeout( () => {
        self.$store.commit('setAlertMessage', null)
      }, 1000)
    }
  },
  methods: {
    showToastButton(text) {
      const self = this
      if(!self.toastBotton || self.toastBotton.destroyed) {
        self.toastBotton = self.$f7.toast.create({
          text: text,
          closeTimeout: 1000,
          destroyOnClose: true
        })
      }
      self.toastBotton.open();
    }
  }, 
};