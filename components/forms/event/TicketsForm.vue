<template>
  <v-form ref="ticketsForm">
    <v-container>
      <v-row>
        <v-col>
          <v-switch
            hide-details
            readonly
            :label="paid ? 'Paid' : 'Free'"
            :value="paid"
          />
          <span v-show="paid && event.tickets_count > 0" class="caption">total benifits: {{ total }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="event.price"
            type="number"
            name="price"
            label="Price"
            validate-on-blur
            solo
            :rules="$rules.price"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="event.tickets_count"
            type="number"
            name="tickets_count"
            label="Tickets"
            validate-on-blur
            solo
            :rules="$rules.tickets"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      event: this.value
    }
  },
  computed: {
    paid () {
      return this.event.price > 0
    },
    total () {
      return this.event.price * this.event.tickets_count
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
    document.querySelector("input[name='price']").min = 1
    document.querySelector("input[name='tickets_count']").min = 1
  },
  methods: {
    validate () {
      return this.$refs.ticketsForm.validate()
    }
  }
}
</script>

<style></style>
