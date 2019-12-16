<template>
  <v-container>
    <ChallengeForm></ChallengeForm>
  </v-container>
</template>

<script>
import ChallengeForm from '../components/ChallengeForm'
export default {
  name: 'ChallengeQuestion',
  components: {
    ChallengeForm
  }
}
</script>

<style>
.form-container {
  max-width: 60%;
}
</style>