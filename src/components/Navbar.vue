
<template>
  <div>
    <v-app-bar
      class="bg-white-fade elevated mb-3 navbar"
      dense
    >
      <v-toolbar-title class="clickable" @click="$router.push('/')">CodeRoyale</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="$router.push('/forum')" v-if="isLogin" icon>
        <v-icon>mdi-comment</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon v-if="isLogin" @click="logout">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
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
  padding-left: 20vh;
  padding-right: 20vh;
}
</style>
