<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <div class="headline">
            {{ event.title }}
          </div>
        </v-col>
        <v-col
          v-show="$abilities.can('create_event')"
          cols="12"
          sm="6"
          class="text-right"
        >
          <v-btn nuxt to="/dashboard/events/new" color="primary">
            <v-icon left>
              mdi-plus
            </v-icon>
            New
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <div class="text--secondary">
            Category
          </div>
          <div v-text="event.category.name" />
        </v-col>
        <v-col cols="12" md="6">
          <div class="text--secondary">
            Location
          </div>
          <div v-text="event.location.name" />
          <span v-text="event.location.address" />
          <v-btn
            x-small
            icon
            color="info"
            target="_blank"
            rel="noopener noreferrer"
            :href="event.location.url"
          >
            <v-icon x-small>
              mdi-open-in-new
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <div class="text--secondary">
            Timing
          </div>
          <div v-text="range.formated" />
          <div v-text="'~' + range.period" />
        </v-col>
        <v-col cols="12" md="6">
          <div class="text--secondary">
            Status
          </div>
          <div class="text-capitalize" v-text="event.state" />
          <div
            v-if="event.state === 'soon'"
            v-text="event.published ? 'Published' : 'Not published'"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <div class="text--secondary">
            Team
          </div>
          <div v-text="event.team.name" />
          <div v-text="`${event.team.province}, ${event.team.country}`" />
        </v-col>
      </v-row>
      <v-row v-if="event.description">
        <v-col cols="12" md="6">
          <div class="text--secondary">
            Description
          </div>
          <div v-text="event.description" />
        </v-col>
      </v-row>
      <v-divider />
    </v-container>
    <!-- Tickets -->
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="headline d-flex justify-space-between">
            <span>Tickets</span>
            <v-btn
              v-show="$abilities.can('view_any_ticket')"
              nuxt
              rounded
              :to="`/dashboard/events/${event.id}/tickets`"
              color="success"
            >
              attendees
              <v-icon right>
                mdi-arrow-right
              </v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <div class="text--secondary">
            Sold
          </div>
          <div v-text="event.sold_tickets + ' of ' + event.tickets_count" />
          <!-- <div class="d-inline-flex">
            <v-progress-circular
              color="primary"
              size="48"
              :rotate="265"
              :value="
                $helpers.percentage(event.sold_tickets, event.tickets_count)
              "
            >
              <small
                v-text="
                  $helpers.percentage(event.sold_tickets, event.tickets_count) +
                    '%'
                "
              />
            </v-progress-circular>
            <div class="ml-4">
              <div v-show="!!event.sold_tickets">
                <div v-text="event.sold_tickets + ' tickets sold'" />
                <span class="d-inline-flex">
                  {{ event.checked_tickets }}
                  <v-icon small color="success">
                    mdi-check-circle-outline
                  </v-icon>
                </span>
                <span class="d-inline-flex">
                  {{ event.sold_tickets - event.checked_tickets }}
                  <v-icon small color="error">
                    mdi-close-circle-outline
                  </v-icon>
                </span>
                <span
                  v-text="
                    $helpers.percentage(
                      event.checked_tickets,
                      event.sold_tickets
                    ) + '%'
                  "
                />
              </div>
            </div>
          </div> -->
        </v-col>
        <v-col cols="12" md="6">
          <div class="text--secondary">
            Checked in
          </div>
          <div v-text="event.checked_tickets" />
        </v-col>
      </v-row>
      <v-row v-show="$abilities.can('view_event_price')">
        <v-col cols="12" md="6">
          <div class="text--secondary">
            Price
          </div>
          <div v-text="event.price || 'Free'" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <!-- <tickets-table :event="event" /> -->
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-img
            width="100%"
            :aspect-ratio="16 / 9"
            :src="$config.baseURL + event.image"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'
require('twix')

export default {
  layout: 'dashboard',
  async asyncData ({ $axios, params, store, error }) {
    try {
      const teamId = store.state.team.team.id
      const event = await $axios.$get(
        `teams/${teamId}/events/${params.id}`
      )
      return {
        event
      }
    } catch (e) {
      error({ statusCode: e.response ? e.response.status : 500 })
    }
  },
  computed: {
    range () {
      if (this.event.start_at && this.event.end_at) {
        const t = moment(this.event.start_at).twix(this.event.end_at)

        return {
          formated: t.format(),
          // formated: t.simpleFormat('dddd, MMM Do [at] HH:mm'),
          period: t.humanizeLength()
        }
      }
      return null
    },
    price () {
      if (!this.event.price) {
        return 'FREE'
      }
      return this.event.price
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'team/SET_TEAM') {
        this.$nuxt.refresh()
      }
    })
  },
  methods: {
    formatDate (date) {
      return moment(date).format('dddd, MMM D, YYYY - hh:mm')
    },
    formatTime (date) {
      return moment(date).format('hh:mm')
    }
  }
}
</script>

<style></style>
