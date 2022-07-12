<template>
  <div>
    <div v-if="!!files.length" class="ma-2">
      <v-btn small depressed class="success" @click="$emit('upload-all')">
        <v-icon left>
          mdi-upload
        </v-icon>
        upload
      </v-btn>
      <v-btn small depressed class="error--text" @click="removeAll">
        clear images
      </v-btn>
      <v-btn
        v-if="selected.length"
        small
        depressed
        class="error--text"
        @click="remove"
      >
        clear selected ({{ selected.length }})
      </v-btn>
    </div>
    <v-slide-group v-model="selected" multiple center-active show-arrows>
      <v-slide-item
        v-for="(file, i) in files"
        :key="i"
        v-slot="{ active, toggle }"
      >
        <file :active="active" :toggle="toggle" :file="file" :index="i" />
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    selected: []
  }),
  methods: {
    removeAll () {
      this.$emit('remove')
      this.selected = []
    },
    remove () {
      this.$emit('remove', this.selected)
      this.selected = []
    }
  }
}
</script>

<style></style>
