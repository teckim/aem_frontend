<template>
  <div v-if="items" :width="width" class="d-inline-block">
    <v-btn
      v-for="(item, i) in items"
      :key="i"
      icon
      :color="btnColor"
      :href="item.link"
      target="_blank"
      class="plain"
      :style="`opacity: ${opacity}`"
    >
      <v-icon size="24" :color="color">
        {{ item.icon }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [
        { icon: 'mdi-facebook', link: 'https://fb.com/aemeeting' },
        { icon: 'mdi-instagram', link: 'https://instagram.com/aemeeting' },
        { icon: 'mdi-twitter', link: 'https://twitter.com/aemeeting' },
        {
          icon: 'mdi-youtube',
          link: 'https://www.youtube.com/channel/UCinasdsWhC1PexLjLybeBqw'
        }
      ]
    },
    width: {
      type: Number,
      default: 184
    },
    color: {
      type: String,
      default: 'white'
    },
    btnColor: {
      type: String,
      default: 'white'
    },
    opacity: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style></style>
