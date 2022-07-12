<template>
  <v-container class="pa-4">
    <v-card tile class="mb-4">
      <v-row no-gutters>
        <v-col cols="12" md="7">
          <v-img
            :aspect-ratio="16 / 9"
            height="100%"
            :src="`http://localhost:8000/${event.image}`"
            class="text-center align-center"
          >
            <template #placeholder>
              <div class="mt-4">
                No image
              </div>
            </template>
            <v-btn fab small color="info" @click="$emit('step', 3)">
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
          </v-img>
        </v-col>
        <v-col cols="12" md="5">
          <v-row class="fill-height" align-center no-gutters>
            <table>
              <tbody>
                <tr>
                  <td class="pr-4">
                    <v-btn icon small color="info" @click="$emit('step', 2)">
                      <v-icon>
                        mdi-clock-outline
                      </v-icon>
                    </v-btn>
                  </td>
                  <td v-show="!!range" class="full-width">
                    <div>
                      {{ range && range.date }}
                    </div>
                    <span class="text--secondary body-2">
                      ~{{ range && range.period }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="pr-4">
                    <v-btn icon small color="info" @click="$emit('step', 1)">
                      <v-icon>
                        mdi-information-variant
                      </v-icon>
                    </v-btn>
                  </td>
                  <td class="full-width">
                    <div>
                      {{ event.title }}
                    </div>
                    <span class="text--secondary body-2">
                      {{ category && category.name }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="pr-4">
                    <v-btn icon small color="info" @click="$emit('step', 1)">
                      <v-icon>
                        mdi-map-marker-outline
                      </v-icon>
                    </v-btn>
                  </td>
                  <td class="full-width">
                    <div>
                      {{ location && location.name }}
                    </div>
                    <span class="text--secondary body-2">
                      {{ location && location.address }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td class="pr-4">
                    <v-btn icon small color="info" @click="$emit('step', 4)">
                      <v-icon>
                        mdi-currency-usd
                      </v-icon>
                    </v-btn>
                  </td>
                  <td class="full-width">
                    <div
                      v-show="event.tickets_count"
                      v-text="event.tickets_count + ' tickets'"
                    />
                    <span class="text--secondary body-2" v-text="eventPrice" />
                  </td>
                </tr>
              </tbody>
            </table>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <div v-show="!!event.description">
      <div class="title">
        About this event
        <v-btn icon small color="info" @click="$emit('step', 1)">
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
      </div>
      <p>{{ event.description }}</p>
    </div>
    <!-- <div>
      <sponsors-form ref="sponsors" @selected="v => (event.sponsors = v)" />
    </div> -->
    <v-row align="center" no-gutters>
      <!-- <v-btn depressed dark color="success" :loading="isSaving" @click="save">
        <span>save event</span>
        <v-icon right>
          mdi-arrow-right
        </v-icon>
      </v-btn> -->
      <!-- <v-checkbox
        v-model="notify"
        label="notify followers by email"

        class="pl-4"
      /> -->
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
require('twix')

export default {
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      event: this.value,
      location: null,
      category: null
    }
  },
  computed: {
    eventPrice () {
      if (!this.event.price) {
        return 'FREE event'
      } else {
        return this.event.price
      }
    },
    range () {
      if (this.event.start_at && this.event.end_at) {
        const t = moment(this.event.start_at).twix(this.event.end_at)

        return {
          date: t.format({ showDayOfWeek: true, hourFormat: 'H' }),
          period: t.humanizeLength()
        }
      }
      return null
    }
  },
  watch: {
    'event.category_id': {
      handler (id) {
        this.getCategoryById(id)
      },
      immediate: true
    },
    'event.location_id': {
      handler (id) {
        this.getLocationById(id)
      },
      immediate: true
    }
  },
  methods: {
    formatRange (date1, date2) {
      if (!date1 || !date2) {
        return ''
      }
      const t = moment(date1).twix(date2)

      return {
        date: t.format({ showDayOfWeek: true, hourFormat: 'H' }),
        length: t.humanizeLength()
      }
    },
    getCategoryById (id) {
      this.$axios
        .$get(`/categories/${id}`)
        .then(data => (this.category = data))
        .catch(() => {
          this.$notifier.error('unable to fetch category, please try again.')
        })
    },
    getLocationById (id) {
      this.$axios
        .$get(`/locations/${id}`)
        .then(data => (this.location = data))
        .catch(() => {
          this.$notifier.error('unable to fetch location, please try again.')
        })
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-spacing: 20px;
  margin: auto;
}
td {
  vertical-align: top;
}
</style>
