<template>
  <div>
    <v-container class="d-flex">
      <div class="headline mb-4">
        Locations
      </div>
      <v-spacer />
      <v-btn v-if="!!id" nuxt to="/dashboard/locations" color="primary">
        <v-icon left>
          mdi-plus
        </v-icon>
        New
      </v-btn>
    </v-container>
    <v-container>
      <location-form :id="id" />
    </v-container>
    <v-container>
      <locations-table />
    </v-container>
  </div>
</template>

<script>
export default {
  // key: to => to.fullPath,
  layout: 'dashboard',
  // asyncData ({ query }) {
  //   const id = query.id || null
  //   return {
  //     id
  //   }
  // },
  // watchQuery: ['id']
  data: () => ({
    id: null
  }),
  watch: {
    '$route.query': {
      handler (v) {
        this.id = v.id
      },
      immediate: true
    }
  }
}
</script>

<style></style>
