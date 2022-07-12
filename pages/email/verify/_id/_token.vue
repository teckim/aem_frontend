<template>
  <v-card-text>
    <status :success="success" :message="message">
      <div class="text-center">
        <div class="my-4">
          <v-progress-circular indeterminate size="80" color="primary" />
        </div>
        <div class="mt-8">
          Verifying your email.
        </div>
      </div>
    </status>
  </v-card-text>
</template>

<script>
export default {
  layout: 'auth',
  data: () => ({
    success: -1,
    errors: {
      email: null
    },
    message: null
  }),
  mounted () {
    this.verifyEmail()
  },
  methods: {
    verifyEmail () {
      const id = this.$route.params.id
      const token = this.$route.params.token
      const signature = this.$route.query.signature

      this.$axios
        .$get(`/email/verify/${id}/${token}?signature=${signature}`)
        .then((data) => {
          this.message = data.message
          this.success = 1
        })
        .catch((e) => {
          this.message = e.response.data.message
          this.success = 0
        })
    }
  }
}
</script>

<style></style>
