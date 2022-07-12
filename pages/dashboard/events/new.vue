<template>
  <div>
    <v-container>
      <div class="headline mb-4">
        New event
      </div>
    </v-container>
    <v-container>
      <event-form
        ref="eventForm"
        v-model="event"
        :loading="loading"
        :submit="save"
      />
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  data () {
    return {
      event: {
        category_id: null,
        title: null,
        location_id: null,
        description: null,
        start_at: null,
        end_at: null,
        publish_at: null,
        unpublish_at: null,
        image: null,
        tickets_count: null,
        team_id: this.$auth.user.team[0].id,
        price: null
      },
      loading: false
    }
  },
  mounted () {
    const id = this.$route.query.cid
    if (id) {
      this.cloneEvent(id)
    }
  },
  methods: {
    save () {
      const eventForm = this.$refs.eventForm
      if (eventForm.validate()) {
        this.loading = true
        const data = JSON.parse(JSON.stringify(this.event))

        this.$axios
          .$post('/events', data)
          .then((data) => {
            this.$router.push('/dashboard/events')
          })
          .catch((e) => {
            this.$notifier.error(e.response.data.message)
          })
          .finally(() => (this.loading = false))
      }
    },
    cloneEvent (id) {
      this.$axios
        .$get(`/events/${id}`)
        .then((data) => {
          const event = {}
          event.category_id = data.category_id
          event.title = data.title
          event.location_id = data.location_id
          event.description = data.description
          event.image = data.image
          event.tickets_count = data.tickets_count
          event.price = data.price

          Object.assign(this.event, event)
          this.$refs.eventForm.preview()
        })
        .catch((e) => {
          this.$notifier.error(`couldn't clone event with id ${id}`)
        })
    }
  }
}
</script>

<style></style>
