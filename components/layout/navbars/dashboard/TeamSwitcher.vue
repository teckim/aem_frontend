<template>
  <v-select
    v-if="items && items.length > 1"
    :items="items"
    class="team-switcher"
    background-color="transparent"
    label="team"
    item-text="name"
    item-value="id"
    rounded
    solo
    dense
    flat
    hide-details
    return-object
    :value="team"
    @input="setTeam"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      items: 'team/teams',
      team: 'team/team'
    })
  },
  // watch: {
  //   'this.$auth.user': {
  //     handler () {
  //       this.setTeams()
  //     },
  //     immediate: true
  //   }
  // },
  // created () {
  //   this.$store.subscribe((mutation, state) => {
  //     if (mutation.type === 'auth/SET') {
  //       console.log('created')
  //       if (this.$auth.user && this.$auth.user.teams.length) {
  //         const found = this.$auth.user.teams.find(
  //           i => i.id === state.team.team.id
  //         )
  //         if (!state.team.team.id || !found) {
  //           this.$store.dispatch('team/setUserTeams', this.$auth.user.teams)
  //         }
  //       }
  //     }
  //   })
  // },
  methods: {
    ...mapActions({
      setTeam: 'team/setUserTeam'
    })
    // setTeams () {
    //   if (this.$auth.user && this.$auth.user.teams.length) {
    //     const found = this.$auth.user.teams.find(
    //       i => i.id === this.$store.state.team.team.id
    //     )
    //     if (!this.$store.state.team.team.id || !found) {
    //       this.$store.dispatch('team/setUserTeams', this.$auth.user.teams)
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
.team-switcher {
  max-width: 150px;
}
</style>
