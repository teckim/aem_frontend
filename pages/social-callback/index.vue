<template>
  <v-container>
    <v-progress-circular indeterminate color="primary" />
    <p>Please wait while we're logging you in...</p>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      token: this.$route.query.token ? this.$route.query.token : null
    }
  },
  async mounted () {
    await this.$auth.loginWith('laravelJWT', {
      data: { token: this.token }
    })
    // console.log(this.$auth.user)

    // this.$auth
    //   .setUserToken('Bearer ' + this.token)
    //   .then(() => {
    //     console.log(this.$auth.user)
    //     return this.$router.push('/')
    //   })
    //   .catch((e) => {
    //     this.$auth.logout()
    //     return this.$router.push(
    //       `/auth/${
    //         this.$route.query.origin ? this.$route.query.origin : 'register'
    //       }?error=1`
    //     )
    //   })
  }
}
</script>

<style></style>
