<template>
  <div class="d-inline-flex">
    <v-menu open-on-hover bottom>
      <template #activator="{ on }">
        <v-btn small text color="primary" v-on="on">
          <v-icon left>
            mdi-account
          </v-icon>
          <div class="text-truncate text-capitalize" style="max-width: 100px">
            {{ $auth.user.firstname }}
          </div>
        </v-btn>
      </template>

      <v-list dense flat>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.to"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-divider class="mx-4" />
        <v-list-item v-if="$auth.user.member" to="/dashboard">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-divider class="mx-4" />
        <v-list-item link @click="logout">
          <v-list-item-title>
            <v-btn small block outlined color="error">
              <span>logout</span>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    menuItems: [
      { title: 'My tickets', to: '/user/tickets' },
      { title: 'Profile', to: '/user/profile/edit' },
      { title: 'Panel', to: '/user' }
    ]
  }),
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>

<style></style>
