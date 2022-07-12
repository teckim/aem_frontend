<template>
  <v-alert
    v-if="$auth.user && !$auth.user.email_verified_at"
    type="warning"
    dense
    outlined
  >
    please verify your email
  </v-alert>
</template>

<script>
export default {}
</script>

<style></style>
