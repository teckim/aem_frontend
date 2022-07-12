<template>
  <v-card
    outlined
    width="100%"
    height="100%"
    :ripple="false"
    @click="toggleSelect"
  >
    <v-img
      aspect-ratio="1"
      :src="`http://localhost:8000/${image}`"
    >
      <template #placeholder>
        <div class=" fill-height d-flex justify-center align-center">
          <v-icon x-large>
            mdi-camera
          </v-icon>
        </div>
      </template>
      <v-slide-y-transition>
        <div
          v-if="selected"
          class="item-overlay d-flex justify-center align-center"
        >
          <div>
            <v-btn fab small color="success" @click.stop="showPreview(true)">
              <v-icon>mdi-image-size-select-large</v-icon>
            </v-btn>
            <v-btn fab small color="error" @click.stop="remove">
              <v-icon>mdi-delete-forever</v-icon>
            </v-btn>
          </div>
        </div>
      </v-slide-y-transition>
    </v-img>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    image: {
      type: String,
      default: null
    }
  },
  data: () => ({}),
  computed: {
    selected () {
      return this.$store.state.media.selectedImage === this.image
    }
  },
  methods: {
    ...mapActions({
      select: 'media/setSelectedImage',
      showPreview: 'media/setPreview'
    }),
    toggleSelect () {
      if (!this.selected) {
        this.select(this.image)
      } else {
        this.select(null)
      }
    },
    remove () {}
  }
}
</script>

<style scoped>
.item-overlay {
  background-color: #2222228e;
  height: 100%;
}
</style>
