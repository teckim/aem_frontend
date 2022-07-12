<template>
  <v-menu offset-x left open-on-hover>
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="primary" @click.native.stop>
          mdi-dots-horizontal
        </v-icon>
      </v-btn>
    </template>
    <v-card>
      <div class="d-inline-flex">
        <v-btn tile icon @click="$emit('share', data.id)">
          <v-icon small>
            mdi-share-variant
          </v-icon>
        </v-btn>
        <v-btn
          v-show="$abilities.can('create_event')"
          tile
          icon
          nuxt
          :to="`/dashboard/events/new?cid=${data.id}`"
        >
          <v-icon small>
            mdi-plus-circle-multiple-outline
          </v-icon>
        </v-btn>
        <v-btn
          v-if="editable"
          tile
          icon
          nuxt
          :to="`/dashboard/events/${data.id}/edit`"
        >
          <v-icon small>
            mdi-circle-edit-outline
          </v-icon>
        </v-btn>
        <v-btn
          v-if="deletable"
          tile
          icon
          color="error"
          @click="$emit('remove', data.id)"
        >
          <v-icon small>
            mdi-delete-forever-outline
          </v-icon>
        </v-btn>
        <v-btn
          v-show="$abilities.can('view_event')"
          tile
          icon
          nuxt
          color="success"
          :to="`/dashboard/events/${data.id}`"
        >
          <v-icon small>
            mdi-arrow-right-circle-outline
          </v-icon>
        </v-btn>
      </div>
    </v-card>
    <!-- <v-list dense>
      <v-list-item @click="$emit('share', data.id)">
        <v-list-item-icon class="mr-4">
          <v-icon small>
            mdi-share-variant
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          share
        </v-list-item-content>
      </v-list-item>
      <v-list-item nuxt :to="`/dashboard/events/new?cid=${data.id}`">
        <v-list-item-icon class="mr-4">
          <v-icon small>
            mdi-plus-circle-multiple-outline
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          clone
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="editable"
        nuxt
        :to="`/dashboard/events/${data.id}/edit`"
      >
        <v-list-item-icon class="mr-4">
          <v-icon small>
            mdi-circle-edit-outline
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          edit
        </v-list-item-content>
      </v-list-item>
      <template v-if="deletable">
        <v-list-item @click="$emit('remove', data.id)">
          <v-list-item-icon class="mr-4">
            <v-icon small color="error">
              mdi-delete-forever-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content class="error--text">
            delete
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list> -->
  </v-menu>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
    editable () {
      return this.data.state === 'soon' && this.$abilities.can('update_event')
    },
    deletable () {
      return this.data.state === 'soon' && !this.data.tickets && this.$abilities.can('delete_event')
    }
  }
}
</script>

<style></style>
