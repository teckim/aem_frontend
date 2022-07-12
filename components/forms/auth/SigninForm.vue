<template>
  <div>
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
      <v-form ref="login_form">
        <v-text-field
          v-model.trim="email"
          solo
          validate-on-blur
          label="Email"
          :disabled="loading"
          :rules="$rules.email"
          @keyup.enter.native="!!email && $refs.pass_input.focus()"
        />
        <v-text-field
          ref="pass_input"
          v-model="pass"
          solo
          validate-on-blur
          label="Password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :disabled="loading"
          :type="showPass ? 'text' : 'password'"
          :rules="$rules.password"
          @click:append="showPass = !showPass"
          @keyup.enter.native="login"
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
          @click="login"
        >
          Log In
        </v-btn>
      </div>
      <div>
        <nuxt-link
          class="caption text-decoration-none info--text"
          to="/forgot-password"
        >
          Forgot password?
        </nuxt-link>
      </div>
    </v-card-text>
    <v-card-text class="caption">
      don't have an account?
      <v-btn small text nuxt to="/register" color="primary">
        register
      </v-btn>
    </v-card-text>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: null,
    pass: null,
    showPass: false,
    loading: false
  }),
  methods: {
    async login () {
      if (!this.$refs.login_form.validate()) {
        return
      }
      const user = {
        email: this.email,
        password: this.pass
      }
      this.loading = true
      try {
        await this.$auth.loginWith('laravelJWT', {
          data: user
        })
        const REDIRECT = this.$route.query.redirect || '/dashboard'
        this.$router.push(REDIRECT)
        // if (this.redirect) {
        //   this.$router.push(this.redirect)
        // } else if (localStorage.getItem('path')) {
        //   this.$router.push(localStorage.getItem('path'))
        // } else if (this.$auth.user.role === 'user') {
        //   this.$router.push('/user')
        // } else {
        //   this.$router.push('/dashboard')
        // }
      } catch (e) {
        if (e.response && e.response.status === 401) {
          return this.$notifier.error('Wrong email or password')
        }
        this.$notifier.error('An error occured, please try again.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.or {
  position: relative;
  top: -15px;
  padding: 0 10px;
  background: #fff;
}

.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  border-radius: 20px;
  /* display:inline-block; */
}
.list-item:first-child {
  margin: 0;
}
.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.button {
  margin: auto;
}
</style>
