<template>
  <v-row align="center" class="fill-height">
    <div v-if="error.statusCode === 404" class="mt-6 mx-auto text-center">
      <v-img max-width="500" :src="require('~/assets/images/404.png')" />
      <h1>Page Not found</h1>
    </div>
    <div v-else-if="error.statusCode === 401" class="mt-6 mx-auto text-center">
      <v-img max-width="500" :src="require('~/assets/images/404.png')" />
      <h1 v-text="errors.notAuthenticated" />
    </div>
    <div v-else-if="error.statusCode === 403" class="mt-6 mx-auto text-center">
      <v-img max-width="500" :src="require('~/assets/images/404.png')" />
      <h1 v-text="errors.notAuthorized" />
    </div>
    <div v-else class="mt-6 mx-auto text-center">
      <v-img max-width="500" :src="require('~/assets/images/500.png')" />
      <h1>An error occurred, Please try agian</h1>
    </div>
  </v-row>
</template>

<script>
export default {
  layout: 'blank',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      errors: {
        pageNotFound: '404 Not Found',
        notAuthenticated: 'Not authenticated',
        notAuthorized: 'Action not authorized',
        otherError: 'An error occurred'
      }
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
