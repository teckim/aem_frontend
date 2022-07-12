<template>
  <v-dialog :value="show" scrollable width="100%" @input="onDialogInput">
    <v-card>
      <v-card-title>
        Media gallery
        <v-spacer />
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-tabs :value="tab" @change="setTab">
          <v-tab value="gallery">
            gallery
          </v-tab>
          <v-tab value="upload">
            upload
          </v-tab>
        </v-tabs>

        <v-tabs-items :value="tab">
          <v-tab-item key="gallery">
            <gallery v-if="tab === 0" />
          </v-tab-item>
          <v-tab-item key="upload">
            <uploader />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-card-actions v-show="tab === 0">
        <v-spacer />
        <v-btn color="success" @click="closeDialog">
          done
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      show: 'media/show',
      tab: 'media/tab',
      selected: 'media/selectedImage'
    })
  },
  methods: {
    ...mapActions({
      toggle: 'media/toggleShow',
      setTab: 'media/setTab'
    }),
    onDialogInput (v) {
      // eslint-disable-next-line no-console
      console.log(v)
      this.toggle(v)
    },
    closeDialog () {
      this.toggle(false)
    }
  }
}
</script>

<style></style>
