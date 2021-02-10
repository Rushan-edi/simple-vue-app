<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col cols="12" xs="12" sm="6" md="5" lg="4" class="ma-auto">
        <v-card class="px-8 pt-6 pb-12" outlined>
          <v-card-title class="text-center">News KE</v-card-title>
          <v-card-subtitle class="mb-5">Sign in</v-card-subtitle>
          <v-card-text>
            <ValidationObserver ref="form" v-slot="{ handleSubmit, reset }">
              <form
                @submit.prevent="handleSubmit(signin)"
                @reset.prevent="reset"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="email"
                    :error-messages="errors"
                    label="Email"
                    outlined
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <v-text-field
                    v-model="password"
                    type="password"
                    :error-messages="errors"
                    label="Password"
                    outlined
                  ></v-text-field>
                </ValidationProvider>
                  <v-btn block type="submit" class="primary" depressed>Sign in</v-btn>
              </form>
            </ValidationObserver>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SignIn',
  data: () => ({
    email: '',
    password: '',
    loading: false
  }),
  methods: {
    async signin() {
      if (this.loading) return
      this.loading = true

      const data = await this.$store
        .dispatch('signIn', { username: this.email, password: this.password })
        .catch((err) => {
          this.loading = false
          console.log(err)
          this.$refs.form.setErrors({
            Email: ["We don't recognize, this email"],
            Password: ["We don't recognize, this password"]
          })
        })
        
      if (!data) return

      this.loading = false
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style></style>
