<template>
  <v-container>
    <AskForm></AskForm>
  </v-container>
</template>

<script>
import AskForm from '../components/AskForm'
export default {
  name: 'AskQuestion',
  components: {
    AskForm
  }
}
</script>

<style>
.form-container {
  max-width: 60%;
}
</style>
