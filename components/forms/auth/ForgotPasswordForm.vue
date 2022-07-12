<template>
  <div>
    <status :success="success" :message="message">
      <v-card-title>
        Forgot password?
      </v-card-title>
      <v-card-text>
        <p class="caption">
          Enter the email address associated with your account <br>
          and we'll send you a link to reset your password.
        </p>
        <v-form ref="forgot_password_form" @submit.prevent>
          <v-text-field
            v-model.trim="email"
            solo
            validate-on-blur
            label="Email"
            :disabled="loading"
            :rules="$rules.email"
            :error-messages="errors.email"
            @keyup.enter.prevent="submit"
          />
        </v-form>
        <div>
          <v-btn
            depressed
            dark
            block
            large
            color="primary"
            :loading="loading"
            @click="submit"
          >
            Submit
          </v-btn>
        </div>
      </v-card-text>
      <v-card-text class="caption">
        don't have an account?
        <v-btn small text nuxt to="/register" color="primary">
          register
        </v-btn>
      </v-card-text>
    </status>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: null,
    loading: false,
    success: -1,
    errors: {
      email: null
    },
    message: null
  }),
  methods: {
    submit () {
      if (!this.$refs.forgot_password_form.validate()) {
        return
      }
      this.loading = true
      this.clearErrors()
      const data = { email: this.email }
      this.$axios
        .post('/auth/forgot-password', data)
        .then((res) => {
          this.message = 'Email sent successfully, Please check your inbox/spam'
          this.success = 1
        })
        .catch((e) => {
          this.errors = e.response.data
        })
        .finally(() => (this.loading = false))
    },
    clearErrors () {
      this.errors.email = null
    }
  }
}
</script>
