
<template>
  <div>
    <v-app-bar
      class="bg-white-fade elevated mb-3 navbar"
      dense
    >
      <v-toolbar-title class="logo-font">code_<span style="color: #6C1BE1">royale</span></v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn @click="$router.push('/forum')" v-if="isLogin" icon>
        <v-icon>mdi-comment</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon v-if="isLogin" @click="logout">mdi-logout</v-icon>
      </v-btn> -->
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState(['isLogin'])
  }
}

</script>
<style scoped>
.navbar {
  padding-left: 20vh;
  padding-right: 20vh;
}
</style>
