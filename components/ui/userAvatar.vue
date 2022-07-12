<template>
  <v-avatar v-if="$auth.user" :size="size" :color="color">
    <img v-if="$auth.user.image" src="src" alt="alt">
    <div v-else v-text="$auth.user.firstname[0] + $auth.user.lastname[0]" />
  </v-avatar>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 38
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style></style>
