<template>
  <div class="my-2">
    <v-responsive
      width="100%"
      height="400"
      content-class="overflow-y-auto overflow-x-hidden"
    >
      <v-row>
        <v-col v-for="(image, i) in images" :key="i" cols="6" md="2" sm="3">
          <gallery-item :image="image" />
        </v-col>
      </v-row>
    </v-responsive>
    <image-preview />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      images: 'media/images'
    })
  },
  mounted () {
    this.setImages()
  },
  methods: {
    ...mapActions({
      setImages: 'media/setImages'
    })
  }
}
</script>

<style></style>
