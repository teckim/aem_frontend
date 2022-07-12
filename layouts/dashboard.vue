<template>
  <v-app>
    <snackbar />
    <dashboard-nav-bar />
    <v-main class="mt-8">
      <nuxt />
    </v-main>
    <!-- <Footer /> -->
    <!-- <snackbar /> -->
  </v-app>
</template>

<script>
export default {
  middleware: ['auth-guard', 'dashboard'],
  created () {
    this.setTeams()
  },
  methods: {
    setTeams () {
      if (this.$auth.user && this.$auth.user.teams.length) {
        const found = this.$auth.user.teams.find(
          i => i.id === this.$store.state.team.team.id
        )
        if (!this.$store.state.team.team.id || !found) {
          this.$store.dispatch('team/setUserTeams', this.$auth.user.teams)
        }
      }
    }
  }
}
</script>
