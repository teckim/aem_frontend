<template>
  <v-form ref="timingForm">
    <v-container>
      <!-- Event start, end timing -->
      <!-- <v-subheader>Start/End timing</v-subheader> -->
      <v-row>
        <v-col cols="12" md="4" sm="8">
          <v-menu
            v-model="startDateMenu"
            transition="scale-transition"
            min-width="290px"
            :close-on-content-click="false"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="formatDate(startDate)"
                name="start-date"
                label="Start date"
                solo
                readonly
                :rules="$rules.startDate"
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="startDate"
              @input="startDateMenu = false"
              @change="startDateChanged"
            />
          </v-menu>
        </v-col>
        <v-col cols="12" md="2" sm="4">
          <v-menu
            ref="startTimeMenu"
            v-model="startTimeMenu"
            transition="scale-transition"
            min-width="290px"
            :close-on-content-click="false"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="startTime"
                name="start-time"
                label="Start time"
                solo
                readonly
                :rules="$rules.startTime"
                v-on="on"
              />
            </template>
            <v-time-picker
              v-model="startTime"
              format="24hr"
              :allowed-minutes="allowedMinutes"
              @click:minute="$refs.startTimeMenu.save(startTime)"
              @change="startTimeChanged"
            />
          </v-menu>
        </v-col>
        <v-col cols="12" md="4" sm="8">
          <v-menu
            v-model="endDateMenu"
            transition="scale-transition"
            min-width="290px"
            :close-on-content-click="false"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="formatDate(endDate)"
                name="end-date"
                label="End date"
                solo
                readonly
                :rules="$rules.endDate"
                v-on="on"
              />
            </template>
            <v-date-picker v-model="endDate" @input="endDateMenu = false" />
          </v-menu>
        </v-col>
        <v-col cols="12" md="2" sm="4">
          <v-menu
            ref="endTimeMenu"
            v-model="endTimeMenu"
            transition="scale-transition"
            min-width="290px"
            :close-on-content-click="false"
            :return-value.sync="endTime"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="endTime"
                name="end-time"
                label="End time"
                solo
                readonly
                :rules="$rules.endTime"
                v-on="on"
              />
            </template>
            <v-time-picker
              v-model="endTime"
              format="24hr"
              :allowed-minutes="allowedMinutes"
              @click:minute="$refs.endTimeMenu.save(endTime)"
            />
          </v-menu>
        </v-col>
      </v-row>
      <!-- Event Publish timing -->
      <!-- <v-subheader>Publishment timing</v-subheader>
      <v-row>
        <v-col cols="12" md="4" sm="8">
          <v-menu
            v-model="publishDateMenu"
            transition="scale-transition"
            min-width="290px"
            :close-on-content-click="false"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="formatDate(publishDate)"
                name="publish-date"
                label="Publish date"
                solo
                readonly
                v-on="on"
              />
            </template>
            <v-date-picker
              v-model="publishDate"
              @input="publishDateMenu = false"
            />
          </v-menu>
        </v-col>
        <v-col cols="12" md="2" sm="4">
          <v-menu
            ref="publishTimeMenu"
            v-model="publishTimeMenu"
            transition="scale-transition"
            min-width="290px"
            :close-on-content-click="false"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="publishTime"
                name="publish-time"
                label="Publish time"
                solo
                readonly
                v-on="on"
              />
            </template>
            <v-time-picker
              v-model="publishTime"
              format="24hr"
              :allowed-minutes="allowedMinutes"
              @click:minute="$refs.publishTimeMenu.save(publishTime)"
            />
          </v-menu>
        </v-col>
        <v-col cols="12" md="4" sm="8">
          <v-menu
            v-model="unpublishDateMenu"
            transition="scale-transition"
            min-width="290px"
            :close-on-content-click="false"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="formatDate(unpublishDate)"
                name="unpublish-date"
                label="publish date"
                solo
                readonly
                v-on="on"
              />
            </template>
            <v-date-picker v-model="unpublishDate" @input="unpublishDateMenu = false" />
          </v-menu>
        </v-col>
        <v-col cols="12" md="2" sm="4">
          <v-menu
            ref="unpublishTimeMenu"
            v-model="unpublishTimeMenu"
            transition="scale-transition"
            min-width="290px"
            :close-on-content-click="false"
            :return-value.sync="unpublishTime"
          >
            <template #activator="{ on }">
              <v-text-field
                :value="unpublishTime"
                name="unpublish-time"
                label="unpublish time"
                solo
                readonly
                v-on="on"
              />
            </template>
            <v-time-picker
              v-model="unpublishTime"
              format="24hr"
              :allowed-minutes="allowedMinutes"
              @click:minute="$refs.unpublishTimeMenu.save(unpublishTime)"
            />
          </v-menu>
        </v-col>
      </v-row> -->
    </v-container>
  </v-form>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'

Vue.mixin({
  methods: {
    watchCollection (arr, cb) {
      arr.forEach(val => this.$watch(val, cb))
    }
  }
})

export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    value: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      event: this.value,
      startDateMenu: false,
      endDateMenu: false,
      startTimeMenu: false,
      endTimeMenu: false,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      // publishDateMenu: false,
      // unpublishDateMenu: false,
      // publishTimeMenu: false,
      // unpublishTimeMenu: false,
      // publishDate: null,
      // publishTime: null,
      // unpublishDate: null,
      // unpublishTime: null,
      allowedMinutes: m => m % 5 === 0
    }
  },
  watch: {
    event: {
      handler (v) {
        this.$emit('input', v)
      },
      deep: true
    }
  },
  created () {
    this.watchCollection(
      ['startDate', 'startTime', 'endDate', 'endTime'],
      this.setDates
    )
  },
  mounted () {
    if (this.event.start_at && this.event.end_at) {
      const start = moment(this.event.start_at)
      const end = moment(this.event.end_at)

      this.startDate = start.format('YYYY-MM-DD')
      this.startTime = start.format('HH:mm')
      this.endDate = end.format('YYYY-MM-DD')
      this.endTime = end.format('HH:mm')
    }
  },
  methods: {
    formatDate (date) {
      return date ? moment(date).format('dddd, MMM D, YYYY') : ''
    },
    setDates () {
      if (this.startDate && this.startTime) {
        this.event.start_at = new Date(
          this.startDate.toString() + 'T' + this.startTime.toString()
        ).toISOString()
      }
      if (this.endDate && this.endTime) {
        this.event.end_at = new Date(
          this.endDate.toString() + 'T' + this.endTime.toString()
        ).toISOString()
      }
    },
    validate () {
      let valid = false
      if (this.$refs.timingForm.validate()) {
        const data = {
          startsOn: new Date(
            this.startDate.toString() + 'T' + this.startTime.toString()
          ),
          endsOn: new Date(
            this.endDate.toString() + 'T' + this.endTime.toString()
          )
        }
        if (data.startsOn.getTime() < new Date().getTime()) {
          this.$notifier.error('Start Date cannot be before current Date')
        } else if (data.startsOn.getTime() >= data.endsOn.getTime()) {
          this.$notifier.error('Start Date cannot be after End Date')
        } else if (data.endsOn.getTime() - data.startsOn.getTime() < 1800000) {
          this.$notifier.error('The Event must be at least 30 min')
        } else {
          valid = true
        }
      }
      return valid
    },
    startDateChanged () {
      if (!this.startTime) {
        this.startTimeMenu = true
      }
      this.endDate = this.startDate
    },
    startTimeChanged () {
      if (!this.endTime) {
        setTimeout(() => {
          const endDateTime = moment(this.event.start_at).add(90, 'minutes')
          this.endDate = endDateTime.format('YYYY-MM-DD')
          this.endTime = endDateTime.format('HH:mm')
        })
      }
    }
  }
}
</script>

<style></style>
