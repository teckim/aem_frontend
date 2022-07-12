<template>
  <v-card>
    <v-data-table
      v-model="selected"
      show-expand
      single-expand
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      :expanded.sync="expanded"
      :footer-props="{
        'items-per-page-options': [5, 10, 15]
      }"
      mobile-breakpoint="960"
      @click:row="onRowClick"
    >
      <template #top>
        <v-row class="mx-0">
          <v-col cols="12" md="8">
            <v-text-field v-model="options.search" label="Search" />
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="options.state" :items="states" label="state" />
          </v-col>
        </v-row>
      </template>
      <template #[`item.tickets`]="{ item }">
        <v-progress-circular
          color="primary"
          size="42"
          :rotate="265"
          :value="$helpers.percentage(item.sold_tickets, item.tickets_count)"
        >
          <small
            class="text--secondary text--darken-1"
            v-text="
              $helpers.percentage(item.sold_tickets, item.tickets_count) + '%'
            "
          />
        </v-progress-circular>
      </template>
      <template #[`item.timing`]="{ item }">
        <span
          v-if="item.state === 'past'"
          v-text="'ended ' + formatDateTime(item.end_at)"
        />
        <span v-else v-text="'start ' + formatDateTime(item.start_at)" />
      </template>
      <template #[`item.state`]="{ item }">
        <span
          v-show="item.state === 'soon'"
          :class="item.published ? 'success--text' : 'error--text'"
          v-text="item.state"
        />
        <span v-show="item.state !== 'soon'" v-text="item.state" />
      </template>
      <template #[`item.actions`]="{ item }">
        <event-actions :data="item" />
        <!-- <v-btn
          icon
          small
          nuxt
          color="success"
          :to="`events/${item.id}/tickets`"
        >
          <v-icon small>
            mdi-ticket-confirmation
          </v-icon>
        </v-btn>
        <v-btn icon small nuxt color="info" :to="`events/${item.id}`">
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn> -->
        <!-- <v-btn icon small color="error" @click="deleteItem(item)">
          <v-icon small>
            mdi-cancel
          </v-icon>
        </v-btn> -->
      </template>
      <template #expanded-item="{ item }">
        <td :colspan="headers.length">
          <event-details :data="item" />
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
require('twix')

export default {
  data: () => ({
    items: [],
    states: ['all', 'soon', 'live', 'past'],
    pagination: 1,
    selected: [],
    total: 0,
    loading: true,
    expanded: [],
    options: {
      state: 'soon'
    },
    headers: [
      { text: 'booked', value: 'tickets', sortable: false },
      { text: 'title', value: 'title' },
      { text: 'state', value: 'state', sortable: false },
      { text: 'timing', value: 'timing' },
      { text: '', value: 'actions', width: 56, align: 'end', sortable: false },
      { text: '', value: 'data-table-expand', width: 56 }
    ]
  }),
  computed: {
    ...mapGetters({
      team: 'team/team'
    })
  },
  watch: {
    options: {
      handler () {
        this.getEvents()
      },
      deep: true
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'team/SET_TEAM') {
        this.getEvents()
      }
    })
  },
  mounted () {
    // this.getEvents()
  },
  methods: {
    getEvents () {
      this.loading = true
      this.$axios
        .$get(`/teams/${this.team.id}/events`, {
          params: this.options
        })
        .then((res) => {
          this.items = res.data
          this.total = res.meta.total
          this.loading = false
        })
        // .catch((e) => {
        //   this.$notifier.error(e.response.data.message)
        // })
        .finally(() => (this.loading = false))
    },
    editItem (item) {
      this.$router.push({ path: this.$route.path, query: { id: item.id } })
    },
    deleteItem (item) {
      this.loading = true
      this.$axios
        .delete(`/events/${item.id}`)
        .then(() => {
          this.$notifier.success('Event deleted successfully')
          this.getEvents()
        })
        .finally(() => (this.loading = false))
    },
    onRowClick (item) {
      this.$router.push(`/dashboard/events/${item.id}`)
    },
    formatTiming (start, end) {
      if (start && end) {
        const t = moment(start).twix(end)

        return {
          date: t.format({ hourFormat: 'HH' }),
          period: t.humanizeLength()
        }
      }
      return null
    },
    formatDateTime (dt) {
      return moment
        .utc(dt)
        .local()
        .fromNow()
    }
  }
}
</script>

<style></style>
