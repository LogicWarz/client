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
    <div>
    <div class="mt-5">
    <v-text-field
      label="Username"
      dense
      outlined
    ></v-text-field>
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
          Already have an account?
        </div>
        <div>
          <b>Sign Up</b>
        </div>
      </v-col>
      <v-col style="padding: 2vh">
        <v-btn class="custom-font float-right primary-gradient"><b>SIGN IN</b></v-btn>
      </v-col>
    </v-row>
    </div>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>
.form-container {
  padding: 5vh;
}
</style>
