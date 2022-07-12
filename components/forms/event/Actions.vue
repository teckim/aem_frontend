<template>
  <div class="text-right">
    <v-btn v-show="step > 1" text @click="$emit('back')">
      <v-icon left>
        mdi-arrow-left
      </v-icon>
      back
    </v-btn>
    <v-btn v-show="step < 5" color="primary" @click="$emit('next')">
      next
      <v-icon right>
        mdi-arrow-right
      </v-icon>
    </v-btn>
    <v-btn v-show="step == 5" :loading="saving" color="success" @click="$emit('submit')">
      save
      <v-icon right>
        mdi-arrow-right
      </v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    step: {
      type: [Number, String],
      default: 1
    },
    saving: {
      type: Boolean,
      default: false
    }
  }
}
</script>
