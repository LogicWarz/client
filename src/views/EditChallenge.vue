<template>
  <v-container>
    <EditChallengeForm></EditChallengeForm>
  </v-container>
</template>

<script>
import EditChallengeForm from '../components/EditChallengeForm'
export default {
  name: 'EditChallengeQuestion',
  components: {
    EditChallengeForm
  }
}
</script>

<style>
.form-container {
  max-width: 60%;
}
</style>
