<template>
  <v-row class="my-2">
    <v-col cols="12" md="6">
      <v-row dense>
        <v-col cols="4" md="3">
          <span class="text--secondary">Timing</span>
        </v-col>
        <v-col cols="8" md="9">
          <div v-text="timing.date" />
          <span class="caption"> ~{{ timing.period }} </span>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="4" md="3">
          <span class="text--secondary">category</span>
        </v-col>
        <v-col cols="8" md="9">
          <div v-text="data.category.name" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6">
      <v-row dense>
        <v-col cols="4" md="3">
          <span class="text--secondary">Location</span>
        </v-col>
        <v-col cols="8" md="9">
          <div v-text="data.location.name" />
          <span class="caption" v-text="data.location.address" />
          <v-btn
            x-small
            icon
            color="info"
            target="_blank"
            rel="noopener noreferrer"
            :href="data.location.url"
          >
            <v-icon x-small>
              mdi-open-in-new
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="4" md="3">
          <span class="text--secondary">Tickets</span>
        </v-col>
        <v-col cols="8" md="9">
          <div v-text="price" />
          <div v-show="!!data.sold_tickets" class="text--secondary caption">
            <span v-text="data.sold_tickets + ' tickets'" />
            <span class="d-inline-flex mx-2">
              {{ data.checked_tickets }}
              <v-icon small color="success">
                mdi-check-circle-outline
              </v-icon>
            </span>
            <span class="d-inline-flex">
              {{ data.sold_tickets - data.checked_tickets }}
              <v-icon small color="error">
                mdi-close-circle-outline
              </v-icon>
            </span>
            <span
              v-text="
                $helpers.percentage(data.checked_tickets, data.sold_tickets) +
                  '%'
              "
            />
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
require('twix')

export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
    timing () {
      if (this.data.start_at && this.data.end_at) {
        const t = moment(this.data.start_at).twix(this.data.end_at)

        return {
          date: t.format({ hourFormat: 'HH' }),
          period: t.humanizeLength()
        }
      }
      return null
    },
    price () {
      if (!this.data.price) {
        return 'FREE'
      }
      return this.data.price
    }
  },
  methods: {}
}
</script>

<style></style>
