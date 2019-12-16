<template>
  <v-row class="mt-4" justify="center">
    <v-col cols="12" sm="8">
      <div @click="$router.push(`challenge/id`)" class="clickable">
        <h3>challenge.title</h3>
      </div>
      <div @click="$router.push('question/1')" class="clickable">
        <small style="color: grey">description</small>
      </div>
      <div>
      </div>
    </v-col>
    <v-col class="center-item" cols="6" sm="2">
      <v-chip
          class="ma-2"
          color="green"
          text-color="white"
          small
          label
        >
          beginner
        </v-chip>
    </v-col>
    <v-col class="center-item" cols="6" sm="2">
      
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "challenge",
  props: ["challenge"]
}
</script>

<style>

</style>
