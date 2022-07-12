<template>
  <v-row>
    <v-col cols="6">
      <v-btn
        depressed
        large
        block
        dark
        color="#DB4437"
        :href="`${baseURL}api/auth/login/google`"
      >
        google
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn
        depressed
        large
        block
        dark
        color="#1877F2"
        :href="`${baseURL}api/auth/login/facebook`"
      >
        facebook
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      baseURL: this.$config.baseURL
    }
  },
  methods: {
    login (service) {
      window.location.href = `${this.$config.baseURL}/auth/login/${service}`
    }
  }
}
</script>

<style></style>
