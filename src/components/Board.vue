<template>
  <v-card
    max-width="500"
    class="mx-auto bg-white-fade"
  >
    <v-toolbar
      class="primary-gradient"
    >
      <v-icon color="white">mdi-trophy</v-icon>

      <v-spacer></v-spacer>

      <v-toolbar-title>Top Players</v-toolbar-title>
    </v-toolbar>
    <v-list class="bg-white-fade" max-height="70vh" style="overflow: scroll">
      <v-list-item
        v-for="(user, index) in users"
        :key="user._id"
      >
        <v-list-item-content>
          {{ index + 1}}.
        </v-list-item-content>
        <v-list-item-content>
          <b>{{ user.name }}</b>
        </v-list-item-content>
        <v-spacer></v-spacer>

        <v-list-item-content>
          <v-chip
            class="ma-2"
            color="warning"
            text-color="white"
          >
            <v-avatar
              left
              class="orange darken-4"
            >
              {{ user.points }}
            </v-avatar>
            Points
          </v-chip>
        </v-list-item-content>

        <v-list-item-avatar v-if="index < 3">
          <v-avatar>
            <v-img :src="require(`../assets/${index + 1}.png`)"></v-img>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-avatar v-else>
          <v-avatar>
          </v-avatar>
        </v-list-item-avatar>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { icon: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        ],
      }
    },
    props: ['users']
  }
</script>