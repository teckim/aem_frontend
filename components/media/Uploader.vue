<template>
  <div>
    <drop-zone>
      <div class="my-12 text-center">
        <v-btn
          large
          color="primary"
          :loading="isSelecting"
          @click="chooseFiles"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          add files
        </v-btn>
      </div>
      <files-slider :files="files" @remove="removeFiles" @upload-all="uploadAll" />
      <input
        ref="uploader"
        class="d-none"
        type="file"
        accept="image/*"
        multiple
        @input="onFilesSelected"
      >
    </drop-zone>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    isSelecting: false
  }),
  computed: {
    ...mapGetters({
      files: 'media/files'
    })
  },
  methods: {
    ...mapActions({
      addFiles: 'media/addFiles',
      removeFiles: 'media/removeFiles',
      uploadAll: 'media/uploadAll'
    }),
    chooseFiles () {
      this.isSelecting = true
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false
        },
        { once: true }
      )
      this.$refs.uploader.click()
    },
    onFilesSelected (e) {
      const files = e.target.files
      if (!files) {
        return
      }
      this.addFiles(files)
      this.$refs.uploader.value = null
    }
  }
}
</script>

<style></style>
