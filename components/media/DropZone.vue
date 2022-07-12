<template>
  <div id="dropzone">
    <div v-show="show" class="dropzone-container" @drop.prevent="onFileDrop">
      <div>
        <v-icon class="upload-icon" size="80" color="#00bdff">
          mdi-cloud-upload-outline
        </v-icon>
      </div>
      <div class="headline">
        Drop your file here
      </div>
    </div>
    <div v-show="!show">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.initEvents()
  },
  methods: {
    ...mapActions({
      addFiles: 'media/addFiles'
    }),
    initEvents () {
      const element = document
      element.addEventListener('dragover', (e) => {
        e.preventDefault()
        this.show = true
      })
      element.addEventListener('dragleave', (e) => {
        e.preventDefault()
        if (!e.x || !e.y) {
          this.show = false
        }
      })
      element.addEventListener('drop', (e) => {
        e.preventDefault()
        this.show = false
      })
    },
    onFileDrop (e) {
      const files = e.dataTransfer.files
      if (!files) {
        return
      }
      this.addFiles(files)
      this.show = false
    }
  }
}
</script>

<style scoped>
.dropzone-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 500px;
  margin-top: 20px;
  border: dashed 2px #00bdff;
  border-radius: 5px;
}
.upload-icon {
  animation: MoveUpDown 0.5s infinite alternate;
}

@keyframes MoveUpDown {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
