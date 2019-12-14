<template>
  <div class="forum">
    <v-container class="forum-container bg-white-fade elevated">
    <v-row>
      <v-col cols="12" sm="3">
      </v-col>
      <v-col cols="12" sm="9">
        <v-row>
          <v-col cols="12" sm="9">
            <div>
              <h2>All Questions</h2>
            </div>
            <v-divider></v-divider>
            <div class="mt-4">
              <h3>This is a title of a question</h3>
            </div>
            <div>
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
          <v-col cols="12" sm="3">
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Questions'
}
</script>

<style>
.forum {
  min-height: 90vh;
}
.forum-container {
  min-height: 90vh;
}
</style>