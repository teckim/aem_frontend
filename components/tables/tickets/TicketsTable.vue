<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-btn
          :disabled="!$abilities.can('update_ticket_checkin')"
          rounded
          small
          color="primary"
          @click="scanQrDialog = true"
        >
          <v-icon small left>
            mdi-qrcode-scan
          </v-icon>
          scan
        </v-btn>
        <template v-if="$abilities.can('update_ticket_checkin_all')">
          <v-btn rounded small @click="checkinAll">
            check in all
          </v-btn>
          <v-btn rounded small @click="checkoutAll">
            check out all
          </v-btn>
        </template>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
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
          >
            <template #top>
              <v-row class="mx-0">
                <v-col cols="12">
                  <v-text-field
                    v-model="options.search"
                    solo
                    label="Search by user firstname, lastname or email"
                  />
                </v-col>
              </v-row>
            </template>
            <template #[`item.checkin_action`]="{ item }">
              <v-switch
                hide-details
                class="my-0 py-0"
                color="success"
                :disabled="!$abilities.can('update_ticket_checkin')"
                :input-value="!!item.checkin_at"
                @change="
                  !item.checkin_at ? checkIn(item.id) : checkOut(item.id)
                "
              />
              <!-- <v-btn
                v-show="!item.checkin_at"
                fab
                x-small
                color="success"
                @click="checkIn(item.id)"
              >
                <v-icon small>
                  mdi-account-check-outline
                </v-icon>
              </v-btn>
              <v-btn
                v-show="!!item.checkin_at"
                fab
                x-small
                color="error"
                @click="checkOut(item.id)"
              >
                <v-icon small>
                  mdi-account-cancel-outline
                </v-icon>
              </v-btn> -->
            </template>
            <template #[`item.checkin_at`]="{ item }">
              {{
                item.checkin_at ? formatDateTime(item.checkin_at) : 'Not yet'
              }}
            </template>
            <!-- <template #[`item.created_at`]="{ item }">
              {{ formatDateTime(item.created_at) }}
            </template> -->
            <template #expanded-item="{ item }">
              <td :colspan="headers.length">
                <div class="text--secondary">
                  Note
                </div>
                <p>{{ item.note || 'No note for this ticket' }}</p>
                <div class="caption text--secondary text-right">
                  Booked at: {{ formatDateTime(item.created_at) }}
                </div>
              </td>
            </template>
          </v-data-table>
          <v-dialog
            :value="scanQrDialog"
            persistent
            width="512px"
            transition="dialog-transition"
          >
            <qr-reader
              v-if="scanQrDialog"
              @decoded="checkIn"
              @close="scanQrDialog = false"
            />
            <!-- <qr-reader
        :open="scanDialog"
        :order="order"
        :error="checkInError"
        :paid-event="event && !!event.price"
        @checkin="checkIn"
        @checkout="checkOut"
        @decoded="checkIn"
        @close="scanDialog = false"
        @done="order = null"
      /> -->
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment'
require('twix')

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    event: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      scanQrDialog: false,
      ticket: null,
      items: this.data,
      pagination: 1,
      selected: [],
      total: 0,
      loading: true,
      expanded: [],
      options: {},
      headers: [
        {
          text: 'In/Out',
          value: 'checkin_action',
          sortable: false,
          width: 40
        },
        { text: 'Firstname', value: 'firstname' },
        { text: 'Lastname', value: 'lastname' },
        { text: 'Email', value: 'email' },
        { text: 'Checked-in at', value: 'checkin_at' },
        // { text: 'Booked at', value: 'created_at' },
        // { text: '', value: 'actions', width: 56, align: 'end', sortable: false },
        { text: '', value: 'data-table-expand', width: 56 }
      ]
    }
  },
  watch: {
    options: {
      handler () {
        this.getTickets()
      },
      deep: true
    }
  },
  created () {
    this.setHeaders()
  },
  methods: {
    getTickets () {
      this.loading = true
      const teamId = this.event.team_id
      const eventId = this.event.id
      this.$axios
        .$get(`teams/${teamId}/events/${eventId}/tickets`, {
          params: this.options
        })
        .then((res) => {
          this.items = res.data
          this.total = res.meta.total
          this.loading = false
        })
        .finally(() => (this.loading = false))
    },
    checkIn (ticketId) {
      const teamId = this.$store.state.team.team.id
      const eventId = this.event.id
      this.$axios
        .$put(`/teams/${teamId}/events/${eventId}/tickets/${ticketId}/checkin`)
        .then(() => {
          this.getTickets()
        })
        .catch((e) => {
          if (e.response && e.response.status === 404) {
            this.$notifier.error('Ticket not fount in this event')
          }
        })
    },
    checkOut (ticketId) {
      const teamId = this.$store.state.team.team.id
      const eventId = this.event.id
      this.$axios
        .$put(`/teams/${teamId}/events/${eventId}/tickets/${ticketId}/checkout`)
        .then(() => {
          this.getTickets()
        })
        .catch((e) => {
          if (e.response && e.response.status === 404) {
            this.$notifier.error('Ticket not fount in this event')
          }
        })
    },
    checkinAll () {
      if (!window.confirm('are you sure you want to check in all attendees?')) {
        return
      }
      const teamId = this.$store.state.team.team.id
      const eventId = this.event.id
      this.$axios
        .$put(`/teams/${teamId}/events/${eventId}/checkin`)
        .then(() => {
          this.getTickets()
        })
    },
    checkoutAll () {
      if (
        !window.confirm('are you sure you want to check out all attendees?')
      ) {
        return
      }
      const teamId = this.$store.state.team.team.id
      const eventId = this.event.id
      this.$axios
        .$put(`/teams/${teamId}/events/${eventId}/checkout`)
        .then(() => {
          this.getTickets()
        })
    },
    // editItem (item) {
    //   this.$router.push({ path: this.$route.path, query: { id: item.id } })
    // },
    // deleteItem (item) {
    //   this.loading = true
    //   this.$axios
    //     .delete(`/events/${item.id}`)
    //     .then(() => {
    //       this.$notifier.success('Event deleted successfully')
    //       this.getEvents()
    //     })
    //     .finally(() => (this.loading = false))
    // },
    // onRowClick (item) {
    //   this.$router.push(`/dashboard/events/${item.id}`)
    // },
    setHeaders () {
      if (this.event.price) {
        this.headers.splice(3, 0, { text: 'Paid', value: 'paid' })
      }
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
      return moment(dt).format('MMM D, YYYY - hh:mm')
    }
  }
}
</script>

<style></style>
