
<template>
    <v-app-bar
      class="bg-standard navbar elevated"
      dense
      collapse-on-scroll
      style="padding-left: 10vw; padding-right: 10vw; margin:"
    >
      <v-toolbar-title class="clickable" @click="$router.push('/')">CodeRoyale</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="isLogin" icon>
        <v-icon>mdi-comment</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-if="isLogin" v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar height="hole">
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title style="width: 200px">
              <v-row>
                <v-icon>mdi-account</v-icon>View Profile
              </v-row>
              <v-row>
                <v-icon @click="logout">mdi-logout</v-icon>Sign Out
              </v-row>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  computed: {
    ...mapState(['isLogin'])
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$store.commit('SET_IS_LOGIN', false)
      this.$router.push('/signin')
    }
  }
}

</script>
<style scoped>
.navbar {
  padding-top: 5px;
}
</style>
