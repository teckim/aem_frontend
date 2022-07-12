<template>
  <v-card :loading="loading">
    <v-card-title
      v-text="isEditMode ? `Edit location #${location.id}` : 'New location'"
    />
    <v-card-text>
      <v-form ref="addLocationForm">
        <v-row>
          <v-col>
            <v-text-field
              v-model.trim="location.name"
              validate-on-blur
              name="name"
              label="Name"
              :error-messages="errors.name"
              :rules="[v => !!v || 'location required']"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model.trim="location.address"
              validate-on-blur
              name="address"
              label="Address"
              :error-messages="errors.address"
              :rules="[v => !!v || 'address required']"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="location.url"
              validate-on-blur
              placeholder="https://"
              name="url"
              :error-messages="errors.url"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn v-show="isEditMode" text @click="$router.push('/dashboard/locations')">
        cancel
      </v-btn>
      <v-btn depressed dark width="100" color="primary" @click="saveLocation">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    location: {
      id: null,
      name: null,
      address: null,
      url: null
    },
    errors: {
      name: null,
      address: null,
      url: null
    },
    loading: false
  }),
  computed: {
    isEditMode () {
      return !!this.id
    }
  },
  watch: {
    id: {
      handler (v) {
        this.location.id = v
        if (v) {
          this.getLocationById(v)
        } else {
          this.init()
        }
      },
      immediate: true
    }
  },
  methods: {
    init () {
      this.location = {
        id: null,
        name: null,
        address: null,
        url: null
      }
    },
    saveLocation () {
      if (this.$refs.addLocationForm.validate()) {
        this.loading = true
        const data = JSON.parse(JSON.stringify(this.location))
        delete data.id
        if (!this.isEditMode) {
          this.addLocation(data)
        } else {
          const id = this.location.id
          this.updateLocation(data, id)
        }
      }
    },
    addLocation (data) {
      this.$axios
        .$post('/locations', data)
        .then(() => {
          this.$notifier.success('location added successfully')
          this.$router.push('/dashboard/locations')
        })
        .catch((e) => {
          if (e.response.status === 400) {
            return (this.errors = e.response.data)
          }
          throw e
        })
        .finally(() => (this.loading = false))
    },
    updateLocation (data, id) {
      this.$axios
        .$put(`/locations/${id}`, data)
        .then((data) => {
          this.$notifier.success('location updated successfully')
          this.$router.push('/dashboard/locations')
        })
        .catch((e) => {
          if (e.response.status === 400) {
            return (this.errors = e.response.data)
          }
          throw e
        })
        .finally(() => (this.loading = false))
    },
    getLocationById (id) {
      this.loading = true
      this.$axios
        .$get(`/locations/${id}`)
        .then((data) => {
          this.location = data
        })
        .catch((e) => {
          if (e.response.status === 400) {
            return (this.errors = e.response.data)
          }
          throw e
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style></style>
