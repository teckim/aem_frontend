<template>
  <v-app>
    <snackbar />
    <v-row
      class="auth-container"
      justify="center"
      no-gutters
    >
      <v-col md="5" cols="12">
        <div class="auth-home_link">
          <v-btn tile text to="/" class="main--text">
            <v-icon left>
              mdi-chevron-left
            </v-icon>
            home
          </v-btn>
        </div>
        <v-card flat height="100%" class="d-flex flex-column justify-center">
          <div>
            <v-card class="mx-auto" flat>
              <v-main>
                <nuxt />
              </v-main>
            </v-card>
          </div>
        </v-card>
      </v-col>
      <v-col
        v-show="$vuetify.breakpoint.mdAndUp"
        align-center
        class="auth__left-side"
        md="7"
        cols="12"
      >
        <div class="auth__left-side-contianer">
          <v-img
            dark
            gradient="to top right, rgba(22, 26, 69, 0.8), rgba(22, 26, 69, 0.5)"
            height="100%"
            class="align-center"
            :src="require('~/assets/images/homeHeader.jpg')"
          >
            <div class="px-6 py-12">
              <h1>
                ALGERIA ENGLISH MEETING.
              </h1>
              <p class="body-2 grey--text text--lighten-2">
                Welcome to the family where we live English, Enjoy your time
                while
                <br>
                your English gets better and better every day.
              </p>
            </div>
          </v-img>
        </div>
        <div class="social_media px-6 py-3">
          <span class="caption grey--text text--lighten-2">Follow us on </span><social-media />
        </div>
        <div class="logo">
          <v-btn tile text to="/" class="white--text px-6" height="auto">
            <v-img
              class="mx-auto"
              width="7rem"
              :src="require('@/static/logos/aem-logo-white.png')"
              alt
            />
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {}
</script>

<style scoped>
.auth-container {
  height: 100vh;
}
.auth__left-side {
  display: flex;
  align-items: center;
  color: #fff;
  background: linear-gradient(
    to top right,
    rgba(22, 26, 69, 0.8),
    rgba(22, 26, 69, 0.5)
  );
}
.auth__left-side-contianer {
  overflow: hidden;
  height: 100%;
}
.auth-home_link {
  position: absolute;
  z-index: 1;
}
.social_media {
  position: absolute;
  z-index: 1;
  bottom: 0;
}
.logo {
  position: absolute;
  z-index: 1;
  top: 0;
}
</style>
