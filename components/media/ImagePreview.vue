<template>
  <v-dialog
    :value="preview"
    scrollable
    persistent
    :overlay="false"
    width="100%"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title>
        image preview
        <v-spacer />
        <v-btn icon @click="showPreview(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-img width="100%" height="100%" :src="`http://localhost:8000/${image}`" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      preview: 'media/preview',
      image: 'media/selectedImage'
    })
  },
  methods: {
    ...mapActions({
      showPreview: 'media/setPreview'
    })
  }
}
</script>

<style></style>
