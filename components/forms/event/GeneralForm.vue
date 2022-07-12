<template>
  <v-form ref="generalForm">
    <v-container>
      <v-row>
        <v-col cols="12" md="3" sm="3">
          <v-autocomplete
            v-model="event.category_id"
            name="category"
            label="Category"
            item-text="name"
            item-value="id"
            solo
            validate-on-blur
            :items="categories"
            :loading="isLoadingCategories"
            :rules="$rules.category"
          />
        </v-col>
        <v-col cols="12" md="3" sm="3">
          <v-text-field
            v-model.trim="event.title"
            name="title"
            label="Title"
            solo
            validate-on-blur
            :rules="$rules.title"
          />
        </v-col>
        <v-col cols="12" md="6" sm="6" class="d-inline-flex align-center">
          <v-autocomplete
            v-model="event.location_id"
            name="location"
            label="Location"
            item-text="address"
            item-value="id"
            solo
            :search-input.sync="searchLocation"
            clearable
            no-filter
            :items="locations"
            :loading="isLoadingLocations"
            :rules="$rules.location"
          >
            <template #no-data>
              <v-list-item>
                <v-list-item-title>
                  Search for a
                  <strong>Location</strong>
                </v-list-item-title>
              </v-list-item>
            </template>
            <template #item="{ item }">
              <v-list-item-content>
                <v-list-item-title v-text="item.name" />
                <v-list-item-subtitle v-text="item.address" />
              </v-list-item-content>
            </template>
          </v-autocomplete>
          <div class="ml-4 mt-n8">
            <v-btn fab small to="/dashboard/locations">
              <v-icon color="primary">
                mdi-map-marker-plus-outline
              </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="event.description"
            name="description"
            label="About the event (optional)"
            counter="16000"
            solo
            validate-on-blur
            :rules="$rules.description"
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
      event: this.value,
      categories: [],
      locations: [],
      gettingLocations: false,
      addLocationDialog: false,
      loading: false,
      searchLocation: null,
      isLoadingLocations: false,
      isLoadingCategories: false
    }
  },
  watch: {
    searchLocation (v) {
      if (this.isLoading || !!this.event.location_id) {
        return
      }
      this.fetchLocations()
    },
    event: {
      handler (v) {
        this.$emit('input', v)
      },
      deep: true
    }
  },
  mounted () {
    this.fetchCategories()
    this.fetchLocations()
  },
  methods: {
    fetchCategories () {
      this.isLoadingCategories = true
      this.$axios
        .$get('/categories')
        .then((data) => {
          this.categories = data
        })
        .catch(e =>
          this.$notifier.error('unable to fetch categories, please try again.')
        )
        .finally(() => (this.isLoadingCategories = false))
    },
    fetchLocations () {
      this.isLoadingLocations = true
      this.$axios
        .$get(`/locations?search=${this.searchLocation || ''}`)
        .then(({ data }) => {
          this.locations = data
        })
        .catch(e =>
          this.$notifier.error('unable to fetch locations, please try again.')
        )
        .finally(() => (this.isLoadingLocations = false))
    },
    validate () {
      return this.$refs.generalForm.validate()
    }
  }
}
</script>

<style></style>
