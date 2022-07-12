<template>
  <div>
    <v-container class="d-flex">
      <div class="headline mb-4">
        Events
      </div>
      <v-spacer />
      <v-btn
        v-show="$abilities.can('create_event')"
        nuxt
        to="/dashboard/events/new"
        color="primary"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        New
      </v-btn>
    </v-container>
    <v-container>
      <events-table />
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'dashboard'
}
</script>

<style></style>
