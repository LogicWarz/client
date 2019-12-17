<template>
  <v-card
    class="form-container elevated bg-white-fade"
    shaped
  >
    <v-img
      src="../assets/logo.png"
      height="90"
      width="90"
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
      <Form @submit.prevent="login">
        <div class="mt-5">
          <v-text-field
            label="Email"
            email
            outlined
            dense
            v-model="emailLog"
          ></v-text-field>
          <v-text-field
            label="Password"
            password
            outlined
            dense
            type="password"
            v-model="passLog"
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
          <v-col style="padding: 2vh; display:flex;">
            <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError"
            >
                <v-icon style="color:white; margin-right:5px;">mdi-google</v-icon>
                SIGN
            </g-signin-button>
            <v-btn type="submit" class="custom-font float-right primary-gradient" style="height:45px;"><b>SIGN IN</b></v-btn>
          </v-col>
        </v-row>
      </Form>
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
            cols="4"
            sm="4"
            style="padding: 2vh"
          >
          <v-btn type="submit" class="custom-font primary-gradient"><b>SIGN UP</b></v-btn>
          </v-col>
          <v-col style="text-align: right">
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
      passReg: '',
      emailLog: '',
      passLog: '',
      googleSignInParams: {
        client_id: '275391644898-thtmag7ptunudskuqijmmpj6mnahphr2.apps.googleusercontent.com',
      },
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
    },
    login () {
      let payload = {
        email: this.emailLog,
        password: this.passLog
      }
      this.$store.dispatch('login', payload)
    },
    onSignInSuccess(googleUser) {
      const profile = googleUser.getBasicProfile();
      const { id_token } = googleUser.getAuthResponse();
      this.$store.dispatch('glogin', { idToken: id_token })
        .then(({data}) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.user_data._id)
          localStorage.setItem('name', data.user_data.name)
          localStorage.setItem('email', data.user_data.email)
          this.$store.commit('SET_LOADING', false)
          this.$store.commit('SET_USER', data.user_data)
          this.$store.commit('SET_IS_LOGIN', true)
          this.$store.commit('SET_MESSAGE', '')
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSignInError(error) {
      console.log(error);
    },
  }
}
</script>

<style>
.form-container {
  padding: 5vh;
}
.g-signin-button {
  float: right;
  font-family: 'Montserrat', sans-serif !important;
  color: #f1f1f1 !important;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px;
  margin-right: 5px;
  background: #8E2DE2;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4A00E0, #8E2DE2);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4A00E0, #8E2DE2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
