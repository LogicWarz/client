<template>
  <v-hover v-slot:default="{ hover }">
  <v-card
    class="mx-auto elevated room clickable bg-white-fade"
    :elevation="hover ? 5 : 'none'"
    opacity="0.5"
    :style="hover? 'opacity: 1;' : 'opacity: 0.9'"
    shaped
    @click="$router.push('/editor')"
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          <v-chip
            color="green"
            text-color="white"
            x-small
          >
            LEVEL
          </v-chip>
        </div>
        <v-list-item-title class="headline mb-1">Challenge Name</v-list-item-title>
        <v-list-item-subtitle><small>The description of the challenge</small></v-list-item-subtitle>
      </v-list-item-content>
      <v-badge color="purple" style="margin-right: 10px">
        <template v-slot:badge><b><small>129</small></b></template>
        <v-avatar>
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
      </v-badge>
    </v-list-item>
  </v-card>
  </v-hover>
</template>

<style scoped>
.room {
  padding: 10px;
}
</style>
