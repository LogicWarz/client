<template>
  <v-row class="mt-4" justify="center">
    <v-col cols="12" sm="8">
      <div @click="$router.push('question/1')" class="clickable">
        <h3>This is a title of a question</h3>
      </div>
      <div @click="$router.push('question/1')" class="clickable">
        <small style="color: grey">This is a the preview of the detailed question and often truncated This is a the preview of the detailed question and often truncated...</small>
      </div>
      <div>
        <v-chip small class="mt-2 mr-1">sometag</v-chip>
        <v-chip small class="mt-2 mr-1">anothertag</v-chip>
      </div>
      <div class="mt-2">
        <v-avatar size="30" class="mr-2">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
        <small>John Watts</small>
        <v-chip
          class="ma-2"
          color="green"
          text-color="white"
          small
          label
        >
          beginner
        </v-chip>
        <small style="color: grey">Asked on Dec 12, 2019</small>
      </div>
    </v-col>
    <v-col class="center-item" cols="6" sm="2">
      <v-avatar class="primary-gradient" size="40">
        <span class="white--text">12</span>
      </v-avatar>
      <div>
        <small style="color: grey">answers</small>
      </div>
    </v-col>
    <v-col class="center-item" cols="6" sm="2">
      <v-avatar color="white" size="40">
        <span class="grey--text">2</span>
      </v-avatar>
      <div>
        <small style="color: grey">votes</small>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {

}
</script>

<style>

</style>
