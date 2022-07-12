<template>
  <div class="snackbars-container px-1">
    <v-snackbar
      v-for="(alert, i) in alerts"
      :key="i"
      v-model="alert.show"
      :timeout="alert.timeout"
      transition="slide-x-transition"
      class="pb-1 pt-0 justify-start"
    >
      <v-responsive max-width="500">
        <div class="d-flex align-center">
          <v-icon
            :color="alert.color"
            size="28"
            v-text="getIcon(alert.color)"
          />
          <v-divider class="mx-2" vertical />
          {{ alert.message }}
        </div>
      </v-responsive>
      <template #action="{ attrs }">
        <v-btn
          icon
          small
          absolute
          class="snackbar-close_btn"
          v-bind="attrs"
          @click="alert.show = false"
        >
          <v-icon small>
            mdi-close
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      alerts: []
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.alerts = this.alerts.filter(alert => alert.show === true)
        this.alerts.push({
          message: state.snackbar.content,
          color: state.snackbar.color,
          timeout: state.snackbar.timeout,
          show: true
        })
      }
    })
  },
  methods: {
    getIcon (v) {
      return v === 'error'
        ? 'mdi-close-circle'
        : v === 'info'
          ? 'mdi-information'
          : 'mdi-check-circle'
    }
  }
}
</script>
<style scoped>
.snackbar-close_btn {
  top: 2px;
  right: 2px;
}
.snackbars-container {
  position: fixed;
  z-index: 9999;
  top: 5px;
  left: 5px;
  height: 0;
  display: flex;
  flex-direction: column;
}
.snackbars-container .v-snack {
  position: relative !important;
}
</style>
