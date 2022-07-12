<template>
  <v-tabs-items :value="success">
    <v-tab-item :key="null" :value="-1">
      <slot />
    </v-tab-item>
    <v-tab-item :key="true" :value="1">
      <animated-icon icon="success" />
      <div class="text-center success--text mt-4" v-text="message" />
    </v-tab-item>
    <v-tab-item :key="false" :value="0">
      <animated-icon icon="error" />
      <div class="text-center error--text mt-4" v-text="message" />
    </v-tab-item>
  </v-tabs-items>
</template>

<script>
export default {
  props: {
    success: {
      type: Number,
      default: -1
    },
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style></style>
