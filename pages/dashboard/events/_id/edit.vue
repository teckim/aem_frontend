<template>
  <div>
    <v-container>
      <div class="headline mb-4">
        Edit event
      </div>
    </v-container>
    <v-container>
      <event-form
        ref="eventForm"
        v-model="event"
        edit
        :loading="loading"
        :submit="save"
      />
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  layout: 'dashboard',
  asyncData ({ params, app, error, redirect }) {
    return app.$axios
      .get(`/events/${params.id}`)
      .then(({ data }) => {
        const editable =
          moment.utc().valueOf() - moment.utc(data.start_at).valueOf() <=
          86400000
        if (!editable) {
          app.$notifier.error("can't edit past or 24h left to event")
          redirect({ path: '/dashboard/events' })
        }
        return { event: data }
      })
      .catch((e) => {
        error({ statusCode: e.response ? e.response.status : 500 })
      })
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    save () {
      const eventForm = this.$refs.eventForm
      if (eventForm.validate()) {
        this.loading = true

        const data = JSON.parse(JSON.stringify(this.event))
        const id = this.$route.params.id
        this.$axios
          .$put(`/events/${id}`, data)
          .then((data) => {
            this.$router.push('/dashboard/events')
          })
          .catch((e) => {
            this.$notifier.error(e.response.data.message)
          })
          .finally(() => (this.loading = false))
      }
    }
  }
}
</script>

<style></style>
