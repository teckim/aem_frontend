<template>
  <v-card min-height="512px">
    <v-card-actions>
      <v-spacer />
      <v-btn depressed small icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <div class="qrreader-container ">
      <qrcode-stream class="qrreader" camera="auto" @decode="onDecode" />
    </div>
  </v-card>
</template>

<script>
export default {
  methods: {
    onDecode (id) {
      this.$emit('decoded', id)
    }
  }
}
</script>

<style scoped>
.qrreader-container {
  position: absolute;
  height: calc(100% - 44px);
  z-index: 1;
  margin: auto;
  left: 0;
  right: 0;
}
.qrreader-container .qrreader {
  overflow: hidden;
}
</style>
