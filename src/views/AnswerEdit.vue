<template>
  <v-container>
    <EditForm></EditForm>
  </v-container>
</template>

<script>
import EditForm from '../components/EditForm'
export default {
  name: 'AnswerEdit',
  components: {
    EditForm
  }
}
</script>

<style>
.form-container {
  max-width: 60%;
}
</style>
