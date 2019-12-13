<template>
  <v-card
    class="form-container elevated bg-white-fade"
    shaped
  >
    <v-img
      src="../assets/logo.png"
      height="60"
      width="60"
      class="m-auto"
    ></v-img>
    <v-alert
      text
      prominent
      dense
      type="error"
      icon="mdi-alert"
      class="mt-4"
      v-if="message"
    >
      <small>{{ message }}</small>
    </v-alert>
    <div v-if="showLogin">
      <div class="mt-5">
        <v-text-field
          label="Email"
          email
          outlined
          dense
        ></v-text-field>
        <v-text-field
          label="Password"
          password
          outlined
          dense
        ></v-text-field>
      </div>
      <v-row>
        <v-col
          cols="6"
          sm="6"
        >
          <div>
            Don't have an account?
          </div>
          <div>
            <b @click="showLogin = false" class="clickable text-primary">Sign Up</b>
          </div>
        </v-col>
        <v-col style="padding: 2vh">
          <v-btn class="custom-font float-right primary-gradient"><b>SIGN IN</b></v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-if="!showLogin">
      <Form @submit.prevent="register">
        <div class="mt-5">
          <v-text-field
            label="Username"
            dense
            outlined
            v-model="name"
          ></v-text-field>
          <v-text-field
            label="Email"
            email
            outlined
            dense
            v-model="emailReg"
          ></v-text-field>
          <v-text-field
            label="Password"
            password
            outlined
            dense
            v-model="passReg"
            type="password"
          ></v-text-field>
        </div>
        <v-row>
          <v-col
            cols="6"
            sm="6"
          >
          <v-btn type="submit" class="custom-font primary-gradient"><b>SIGN UP</b></v-btn>
          </v-col>
          <v-col style="padding: 2vh; text-align: right">
            <div>
              Already have an account?
            </div>
            <div>
              <b @click="showLogin = true" class="clickable text-primary">Sign In</b>
            </div>
          </v-col>
        </v-row>
      </Form>
    </div>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AuthForm',
  data () {
    return {
      showLogin: true,
      name: '',
      emailReg: '',
      passReg: ''
    }
  },
  computed: {
    ...mapState(['message'])
  },
  methods: {
    register () {
      let payload = {
        name: this.name,
        email: this.emailReg,
        password: this.passReg
      }
      this.$store.dispatch('register', payload)
    }
  }
}
</script>

<style>
.form-container {
  padding: 5vh;
}
</style>
