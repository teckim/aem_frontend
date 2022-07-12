<template>
  <v-card
    v-if="!isUploading && !isFailed && !uploaded"
    height="150"
    width="100"
    class="ma-2"
    rounded
    @click="toggle"
  >
    <v-img
      v-show="!active"
      :src="src"
      class="white--text align-end"
      gradient="to bottom, rgba(255,255,255,.01), rgba(255,255,255,.6)"
      height="100%"
    >
      <div class="caption black--text mx-2" v-text="size" />
    </v-img>
    <v-slide-x-transition>
      <v-row
        v-show="active"
        class="fill-height"
        align="center"
        justify="center"
        no-gutters
      >
        <v-icon large color="info">
          mdi-check
        </v-icon>
      </v-row>
    </v-slide-x-transition>
  </v-card>
  <v-card
    v-else-if="isUploading || uploaded"
    height="150"
    width="100"
    class="ma-2"
    rounded
  >
    <v-progress-linear v-show="isUploading" :value="progress" />
    <v-row class="fill-height" align="center" justify="center" no-gutters>
      <div v-show="isUploading" class="primary--text">
        {{ progress }}%
      </div>
      <v-icon v-show="uploaded" large color="success">
        mdi-check
      </v-icon>
    </v-row>
  </v-card>
  <v-card v-else height="150" width="100" class="ma-2" rounded>
    <v-slide-x-transition>
      <v-row
        v-show="isFailed"
        class="fill-height"
        align="center"
        justify="center"
        no-gutters
      >
        <v-btn fab x-small @click.stop="reupload">
          <v-icon small color="primary">
            mdi-reload
          </v-icon>
        </v-btn>
      </v-row>
    </v-slide-x-transition>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    file: {
      type: null,
      default: null,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Function,
      default: null
    },
    index: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    src: null,
    size: null
  }),
  computed: {
    ...mapGetters({
      progressObj: 'media/progress',
      failed: 'media/failed'
    }),
    progress () {
      return this.progressObj && this.progressObj[this.index]
        ? this.progressObj[this.index]
        : 0
    },
    isUploading () {
      return this.progress > 0 && this.progress < 100
    },
    uploaded () {
      return this.progress === 100 && !this.isFailed
    },
    isFailed () {
      if (!this.failed) {
        return false
      } else {
        return this.failed.includes(this.index)
      }
    }
  },
  mounted () {
    this.fileToImageSrc(this.file)
    this.size = this.formatBytes(this.file.size)
  },
  methods: {
    ...mapActions({
      uploadByIndex: 'media/uploadByIndex'
    }),
    reupload () {
      this.uploadByIndex(this.index)
    },
    fileToImageSrc (file) {
      const reader = new FileReader()
      const vm = this
      reader.addEventListener(
        'load',
        function () {
          vm.src = reader.result
        },
        false
      )
      if (file) {
        reader.readAsDataURL(file)
      }
    },
    formatBytes (bytes, decimals = 2) {
      if (bytes === 0) {
        return '0 Bytes'
      }

      const k = 1024
      const dm = decimals < 0 ? 0 : decimals
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / k ** i).toFixed(dm)) + ' ' + sizes[i]
    }
  }
}
</script>

<style></style>
