<template>
  <v-container>
    <EditMyQuestion></EditMyQuestion>
  </v-container>
</template>

<script>
import EditMyQuestion from '../components/EditMyQuestion'
export default {
  name: 'AskQuestion',
  components: {
    EditMyQuestion
  }
}
</script>

<style>
.form-container {
  max-width: 60%;
}
</style>
