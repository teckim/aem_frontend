<template>
  <span>
    <v-app-bar app flat>
      <!-- <nuxt-link to="/" class="pa-3 d-flex">
        <img height="36" src="/logos/aem.png">
      </nuxt-link> -->
      <team-switcher />
      <v-spacer />
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <!-- <main-nav-bar-routes :routes="routes" /> -->
        <v-spacer />
        <!-- <nav v-if="!$auth.loggedIn">
          <v-tabs centered hide-slider class="font-weight-bold" height="64">
            <v-tab nuxt to="/login" :ripple="false">
              <div>login</div>
            </v-tab>
          </v-tabs>
        </nav> -->
        <div class="d-flex align-center" style="height: 64px">
          <user-menu />
        </div>
      </template>
      <div class="d-md-none d-block px-1">
        <v-app-bar-nav-icon @click="mainPanel = !mainPanel" />
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="mainPanel"
      :expand-on-hover="!$vuetify.breakpoint.smAndDown"
      mobile-breakpoint="960"
      width="296"
      :right="$vuetify.rtl"
      app
      bottom
    >
      <dashboard-panel />
    </v-navigation-drawer>
  </span>
</template>

<script>
export default {
  data: () => ({
    mainPanel: true,
    routes: [
      {
        title: 'Home',
        to: '/'
      },
      {
        title: 'Events',
        to: '/events'
      },
      {
        title: 'Join us',
        to: '/join'
      },
      {
        title: 'About us',
        to: '/about-us'
      }
    ]
  })
}
</script>
