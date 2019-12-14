<template>
<div>
  <v-container class="detail-question-container elevated bg-white-fade pa-8">
    <div>
      <h3>This is the title of a question</h3>
    </div>
    <v-divider class="mt-4"></v-divider>
    <v-row>
      <v-col class="center-item" sm="1">
        <div>
          <v-icon>mdi-arrow-up</v-icon>
        </div>
        <div class="ma-3">
          <h2>4</h2>
        </div>
        <div>
          <v-icon>mdi-arrow-down</v-icon>
        </div>
      </v-col>
      <v-col sm="11">
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        <div class="mt-3">
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
    </v-row>
  </v-container>
  <v-container class="answers-container elevated bg-white-fade pa-8 mt-2">
    <div>
      <h3>3 Answers</h3>
    </div>
    <v-divider class="mt-4"></v-divider>
    <v-row>
      <v-col class="center-item" sm="1">
        <div>
          <v-icon>mdi-arrow-up</v-icon>
        </div>
        <div class="ma-3">
          <h2>4</h2>
        </div>
        <div>
          <v-icon>mdi-arrow-down</v-icon>
        </div>
      </v-col>
      <v-col sm="11">
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        <div class="mt-3">
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
    </v-row>
    <v-row>
      <v-col class="center-item" sm="1">
        <div>
          <v-icon>mdi-arrow-up</v-icon>
        </div>
        <div class="ma-3">
          <h2>4</h2>
        </div>
        <div>
          <v-icon>mdi-arrow-down</v-icon>
        </div>
      </v-col>
      <v-col sm="11">
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        This is the content of this question. This should be the detailed information about what's being asked.
        <div class="mt-3">
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
    </v-row>
  </v-container>
</div>
</template>

<script>
export default {

}
</script>

<style>
.detail-question-container {
  max-width: 60vw;
}
.answers-container {
  max-width: 60vw;
}
</style>