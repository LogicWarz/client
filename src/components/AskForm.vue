<template>
  <v-container class="form-container bg-white-fade elevated pa-10">
    <v-text-field
      label="Title"
      dense
      outlined
    ></v-text-field>
    <v-textarea
      label="Content"
      auto-grow
      outlined
      rows="3"
      row-height="25"
      shaped
    ></v-textarea>
    <v-btn rounded class="primary-gradient">
      <b>POST</b>
    </v-btn>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>