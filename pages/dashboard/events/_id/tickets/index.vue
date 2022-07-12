<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="headline">
            Tickets
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <tickets-table
            :data="tickets"
            :event="event"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  async asyncData ({ $axios, params, store, error }) {
    try {
      const teamId = store.state.team.team.id
      const event = await $axios.$get(`teams/${teamId}/events/${params.id}`)
      const { data } = await $axios.$get(
        `teams/${teamId}/events/${params.id}/tickets`
      )
      return {
        event,
        tickets: data
      }
    } catch (e) {
      error({ statusCode: e.response ? e.response.status : 500 })
    }
  }
}
</script>

<style></style>
