<template>
  <div class="mb-12 header">
    <v-parallax
      :src="require('~/assets/images/homeHeader.jpg')"
      height="480"
      class="px-0"
    >
      <div class="header__hero-container">
        <v-container class="fill-height">
          <v-row align="center">
            <v-col>
              <v-responsive max-width="700px">
                <h1>
                  JOIN AN EVENT TODAY.
                </h1>
                <p class="grey--text text--lighten-3 mb-8">
                  Search among the most intersting events,<br>
                  get a ticket and have fun.
                </p>
                <div>
                  <v-btn rounded dark large color="primary" to="/events">
                    get started!
                    <v-icon right>
                      mdi-chevron-right
                    </v-icon>
                  </v-btn>
                </div>
              </v-responsive>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header__hero-container {
  background: linear-gradient(
    to top right,
    rgba(22, 26, 69, 0.8),
    rgba(22, 26, 69, 0.5)
  );
  height: 100%;
}
</style>
