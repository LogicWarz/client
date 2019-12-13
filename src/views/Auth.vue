<template>
  <v-container class="main-container">
    <v-row align="center" justify="center" no-gutters>
      <v-col
        cols="12"
        sm="6"
        class="col"
      >
      <AuthForm></AuthForm>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-img
          src="../assets/auth.png"
          aspect-ratio="1.1"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthForm from '../components/AuthForm'
export default {
  name: 'Auth',
  components: {
    AuthForm
  }
}
</script>
<style scoped>
  .main-container {
    height: 90vh;
  }
  .full-width {
    width: 100% !important
  }
  .col {
    padding: 5vh
  }
</style>
