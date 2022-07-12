<template>
  <nav>
    <v-tabs
      centered
      hide-slider
      background-color="transparent"
      class="font-weight-bold"
      height="64"
    >
      <!-- <v-tabs-slider color="main" /> -->
      <v-tab
        v-for="(route, i) in routes"
        :key="i"
        nuxt
        :ripple="false"
        :to="route.to"
      >
        <div v-text="route.title" />
      </v-tab>
    </v-tabs>
  </nav>
  <!-- <div v-if="$auth.loggedIn" class="d-inline-flex">
      <message-icon />
      <v-btn icon @click="showCart(true)">
        <v-badge
          bordered
          overlap
          color="primary"
          :value="cartCount"
          :content="cartCount"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon nuxt :to="localePath('/user/fav')">
        <v-badge
          bordered
          overlap
          color="primary"
          :value="favCount"
          :content="favCount"
        >
          <v-icon color="error">
            mdi-heart
          </v-icon>
        </v-badge>
      </v-btn>
      <v-menu v-if="$auth.user" open-on-hover offset-y>
        <template #activator="{ on }">
          <v-btn icon color="primary" v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list dense flat>
          <v-list-item nuxt :to="localePath('/user')">
            <v-list-item-icon>
              <v-icon small v-text="'mdi-account'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="$t('navbar.profile')" />
            </v-list-item-content>
          </v-list-item>
          <v-divider class="my-2" />
          <v-list-item>
            <v-btn small block color="primary" @click="$auth.logout('local')">
              <span v-text="$t('buttons.logout')" />
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-divider vertical class="my-3 mx-1" />
    </div>
    <div class="d-none d-md-inline-flex">
      <v-btn
        v-show="!$auth.loggedIn && !$auth.user"
        depressed
        nuxt
        color="primary"
        :to="localePath('/signup')"
      >
        <span v-text="$t('buttons.get_started')" />
      </v-btn>
      <language-switcher class="mx-1" />
    </div> -->
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({})
}
</script>
