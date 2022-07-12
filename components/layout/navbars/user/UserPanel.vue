<template>
  <div>
    <div class="d-flex flex-column fill-height">
      <v-list flat nav class="py-10">
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(route, i) in routes"
            :key="i"
            nuxt
            router
            exact
            :to="route.to"
          >
            <v-list-item-content class="text-center py-4">
              <v-list-item-title v-text="route.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style></style>
