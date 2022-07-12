<template>
  <status :success="success" :message="message">
    <v-card-title>
      Reset password
    </v-card-title>
    <v-card-text>
      <v-form ref="forgot_password_form" @submit.prevent>
        <v-text-field
          v-model.trim="email"
          solo
          validate-on-blur
          label="Email"
          :disabled="loading"
          :rules="$rules.email"
          :error-messages="errors.email"
          @keyup.enter.native="!!email && $refs.pass_input.focus()"
        />
        <v-text-field
          ref="pass_input"
          v-model="password"
          solo
          validate-on-blur
          label="Password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :disabled="loading"
          :type="showPass ? 'text' : 'password'"
          :rules="$rules.password"
          :error-messages="errors.password"
          @click:append="showPass = !showPass"
          @keyup.enter.native="login"
        />
        <v-text-field
          ref="pass_input"
          v-model="password_confirmation"
          solo
          validate-on-blur
          label="Password confirmation"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :disabled="loading"
          :type="showPass ? 'text' : 'password'"
          :rules="
            $rules.Password_confirmation.concat(
              v => (!!v && v === password) || 'password not confirmed'
            )
          "
          @click:append="showPass = !showPass"
          @keyup.enter.native="reset"
        />
      </v-form>
      <v-btn
        depressed
        large
        dark
        block
        color="primary"
        :loading="loading"
        @click="reset"
      >
        Reset
      </v-btn>
    </v-card-text>
  </status>
</template>

<script>
export default {
  data: () => ({
    email: null,
    password: null,
    password_confirmation: null,
    showPass: false,
    loading: false,
    success: -1,
    errors: {
      email: null,
      password: null
    },
    message: null
  }),
  methods: {
    reset () {
      if (!this.$refs.forgot_password_form.validate()) {
        return
      }
      this.loading = true
      this.clearErrors()
      const data = {
        email: this.email,
        token: this.$route.params.token,
        password: this.password,
        password_confirmation: this.password_confirmation
      }
      this.$axios
        .post('/auth/reset-password', data)
        .then((res) => {
          this.message = 'Password reset successfully!'
          this.success = 1
        })
        .catch((e) => {
          this.errors = e.response.data
          if (typeof e.response.data.message === 'object') {
            this.message = e.response.data.message[0]
            this.success = 0
          } else {
            this.message = e.response.data.message
            this.success = 0
          }
        })
        .finally(() => (this.loading = false))
    },
    clearErrors () {
      this.errors = {
        email: null,
        password: null
      }
    }
  }
}
</script>

<style></style>
