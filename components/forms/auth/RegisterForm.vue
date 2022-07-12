<template>
  <v-card flat :disabled="loading">
    <v-card-text>
      <social-login />
    </v-card-text>
    <v-card-text>
      <div class="d-flex align-center">
        <v-divider />
        <div class="px-4">
          Or
        </div>
        <v-divider />
      </div>
    </v-card-text>
    <v-card-text>
      <v-form ref="register_form">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="user.firstname"
              solo
              validate-on-blur
              label="Firstname"
              :rules="$rules.firstname"
              :error-messages="errors.firstname"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="user.lastname"
              solo
              validate-on-blur
              label="Lastname"
              :rules="$rules.lastname"
              :error-messages="errors.lastname"
            />
          </v-col>
        </v-row>
        <v-text-field
          v-model.trim="user.email"
          solo
          validate-on-blur
          label="Email"
          :rules="$rules.email"
          :error-messages="errors.email"
        />
        <v-text-field
          ref="pass_input"
          v-model="user.password"
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
          v-model="user.password_confirmation"
          solo
          validate-on-blur
          label="Password confirmation"
          :append-icon="showConfPass ? 'mdi-eye' : 'mdi-eye-off'"
          :disabled="loading"
          :type="showConfPass ? 'text' : 'password'"
          :rules="
            $rules.Password_confirmation.concat(
              v => (!!v && v === user.password) || 'password not confirmed'
            )
          "
          @click:append="showConfPass = !showConfPass"
          @keyup.enter.native="login"
        />
      </v-form>
      <v-btn
        depressed
        large
        dark
        block
        color="primary"
        :loading="loading"
        @click="register"
      >
        Register
      </v-btn>
    </v-card-text>
    <v-card-text class="caption">
      already have an account?
      <v-btn small text to="/login" color="primary">
        log in
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  data: () => ({
    user: {
      email: null,
      firstname: null,
      lastname: null,
      password: null,
      password_confirmation: null
    },
    showPass: false,
    showConfPass: false,
    loading: false,
    errors: {
      email: null,
      firstname: null,
      lastname: null,
      password: null
    }
  }),
  methods: {
    register () {
      if (!this.$refs.register_form.validate()) { return }
      this.loading = true
      this.clearErrors()
      const user = JSON.parse(JSON.stringify(this.user))
      this.$axios
        .post('/auth/register', user)
        .then((res) => {
          this.$auth.loginWith('laravelJWT', {
            data: user
          })
          this.$router.push(this.to || '/')
        })
        .catch((e) => {
          this.errors = e.response.data
        })
        .finally(() => (this.loading = false))
    },
    clearErrors () {
      this.errors = {
        email: null,
        firstname: null,
        lastname: null,
        password: null
      }
    }
  }
}
</script>

<style></style>
