<template>
  <v-card>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="locations"
      :options.sync="options"
      :server-items-length="total"
      :loading="loading"
      :footer-props="{
        'items-per-page-options': [5, 10, 15]
      }"
    >
      <template #[`item.actions`]="{ item }">
        <!-- <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon> -->
        <v-btn
          exact
          icon
          small
          nuxt
          color="info"
          :to="{ query: { id: item.id } }"
        >
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn icon small color="error" @click="deleteItem(item)">
          <v-icon small>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
      <template #[`item.url`]="{ item }">
        <a
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          v-text="item.url"
        />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    locations: [],
    pagination: 1,
    selected: [],
    total: 0,
    loading: true,
    options: {},
    headers: [
      { text: 'name', value: 'name' },
      { text: 'address', value: 'address' },
      { text: 'url', value: 'url' },
      { text: 'Actions', value: 'actions', sortable: false, width: 100 }
    ]
  }),
  watch: {
    options: {
      handler () {
        this.getLocations()
      },
      deep: true
    }
  },
  mounted () {
    this.getLocations()
  },
  methods: {
    getLocations () {
      this.loading = true
      this.$axios
        .$get('/locations', {
          params: this.options
        })
        .then((res) => {
          this.locations = res.data
          this.total = res.total
          this.loading = false
        })
        .catch((e) => {
          this.$notifier.error(e.response.data.message)
        })
        .finally(() => (this.loading = false))
    },
    editItem (item) {
      this.$router.push({ path: this.$route.path, query: { id: item.id } })
    },
    deleteItem (item) {
      this.loading = true
      this.$axios
        .delete(`/locations/${item.id}`)
        .then(() => {
          this.$notifier.success('Location deleted successfully')
          this.getLocations()
        })
        .catch((e) => {
          this.$notifier.error(e.response.data.message)
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style></style>
