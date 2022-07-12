<template>
  <v-stepper v-model="step" vertical>
    <v-stepper-step
      :color="step > 1 ? 'success' : 'primary'"
      :complete="step > 1"
      :editable="completed"
      :rules="[rules.generalForm]"
      edit-icon="mdi-circle-medium"
      step="1"
    >
      <span :class="step === 1 ? 'body-1' : 'body-2'">General</span><small v-show="step === 1" class="main--text">required</small>
    </v-stepper-step>
    <v-stepper-content step="1">
      <general-form ref="generalForm" v-model="event" />
      <actions :step="step" @back="back" @next="next" />
    </v-stepper-content>
    <v-stepper-step
      :color="step > 2 ? 'success' : 'primary'"
      :complete="step > 2"
      :editable="completed"
      :rules="[rules.timingForm]"
      edit-icon="mdi-circle-medium"
      step="2"
    >
      <span :class="step === 2 ? 'body-1' : 'body-2'">Timing</span><small v-show="step === 2" class="main--text">required</small>
    </v-stepper-step>
    <v-stepper-content step="2">
      <timing-form ref="timingForm" v-model="event" />
      <actions :step="step" @back="back" @next="next" />
    </v-stepper-content>
    <v-stepper-step
      :color="step > 3 ? 'success' : 'primary'"
      :complete="step > 3"
      :editable="completed"
      :rules="[rules.mediaForm]"
      edit-icon="mdi-circle-medium"
      step="3"
    >
      <span :class="step === 3 ? 'body-1' : 'body-2'">Media</span>
    </v-stepper-step>
    <v-stepper-content step="3">
      <media-form ref="mediaForm" v-model="event" />
      <actions :step="step" @back="back" @next="next" />
    </v-stepper-content>
    <v-stepper-step
      :color="step > 4 ? 'success' : 'primary'"
      :complete="step > 4"
      :editable="completed"
      :rules="[rules.ticketsForm]"
      edit-icon="mdi-circle-medium"
      step="4"
    >
      <span :class="step === 4 ? 'body-1' : 'body-2'">Tickets</span>
    </v-stepper-step>
    <v-stepper-content step="4">
      <tickets-form ref="ticketsForm" v-model="event" />
      <actions :step="step" @back="back" @next="next" />
    </v-stepper-content>
    <v-stepper-step
      :color="step === 5 ? 'success' : 'primary'"
      :complete="step === 5"
      :editable="completed"
      edit-icon="mdi-circle-medium"
      step="5"
    >
      <span :class="step === 5 ? 'body-1' : 'body-2'">Preview & save</span>
    </v-stepper-step>
    <v-stepper-content step="5">
      <event-preview v-model="event" @step="v => (step = v)" />
      <actions
        :step="step"
        :saving="loading"
        @back="back"
        @next="next"
        @submit="submit"
      />
    </v-stepper-content>
  </v-stepper>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: null
    },
    submit: {
      type: Function,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      event: this.value,
      rules: {
        generalForm: () =>
          !this.completed
            ? true
            : this.$refs.generalForm && this.$refs.generalForm.validate(),
        timingForm: () =>
          !this.completed
            ? true
            : this.$refs.timingForm && this.$refs.timingForm.validate(),
        mediaForm: () => (!this.completed ? true : !!this.event.image),
        ticketsForm: () =>
          !this.completed
            ? true
            : this.$refs.ticketsForm && this.$refs.ticketsForm.validate()
      },
      step: 1,
      completed: false
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
  mounted () {
    if (this.edit) {
      this.preview()
    }
  },
  methods: {
    next () {
      switch (Number(this.step)) {
        case 1:
          if (this.$refs.generalForm.validate()) {
            this.step++
          }
          break
        case 2:
          if (this.$refs.timingForm.validate()) {
            this.step++
          }
          break
        case 3:
          if (this.$refs.mediaForm.validate()) {
            this.step++
          }
          break
        case 4:
          if (this.$refs.ticketsForm.validate()) {
            this.step++
            this.completed = true
          }
          break
      }
    },
    back () {
      this.step--
    },
    preview () {
      this.step = 5
      this.completed = true
    },
    validate () {
      for (let i = 1; i < 6; i++) {
        switch (i) {
          case 1:
            if (!this.$refs.generalForm.validate()) {
              this.step = i
              return false
            }
            break
          case 2:
            if (!this.$refs.timingForm.validate()) {
              this.step = i
              return false
            }
            break
          case 3:
            if (!this.$refs.mediaForm.validate()) {
              this.step = i
              return false
            }
            break
          case 4:
            if (!this.$refs.ticketsForm.validate()) {
              this.step = i
              return false
            }
            break
        }
      }
      return true
    }
  }
}
</script>

<style></style>
