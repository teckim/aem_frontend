<template>
  <v-container>
    <media-gallery />
    <div class="text-center">
      <v-btn rounded color="primary" @click="toggleShow(0)">
        <v-icon left>
          mdi-image-album
        </v-icon>
        {{ selectedImage ? 'change image' : 'open gallery' }}
      </v-btn>
      <v-btn rounded color="info" @click="toggleShow(1)">
        <v-icon left>
          mdi-upload
        </v-icon>
        upload
      </v-btn>
    </div>
    <v-img
      class="mx-auto my-4"
      width="500"
      :aspect-ratio="16 / 9"
      :src="$config.baseURL + event.image"
    >
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          no image
        </v-row>
      </template>
    </v-img>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      event: this.value
    }
  },
  computed: {
    ...mapGetters({
      selectedImage: 'media/selectedImage'
    })
  },
  watch: {
    event: {
      handler (v) {
        this.$emit('input', v)
      },
      deep: true
    },
    selectedImage (v) {
      this.event.image = v
    }
  },
  methods: {
    ...mapActions({
      toggleShow: 'media/toggleShow'
    }),
    validate () {
      if (!this.event.image) {
        this.$notifier.error('Please choose an image')
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style></style>
