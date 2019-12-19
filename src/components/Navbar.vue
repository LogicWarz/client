<template>
  <div>
    <v-app-bar class="bg-white-fade elevated mb-3 navbar" dense>
      <v-toolbar-title class="clickable logo-font" @click="$router.push('/')">
        code_<span style="color: #6C1BE1;">royale</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="$router.push('/challenges')" v-if="user.admin && isLogin" icon>
        <v-icon>mdi-settings</v-icon>
      </v-btn>

      <v-btn @click="$router.push('/rank')" v-if="isLogin" icon>
        <v-icon>mdi-trophy</v-icon>
      </v-btn>

      <v-btn @click="$router.push('/forum')" v-if="isLogin" icon>
        <v-icon>mdi-comment</v-icon>
      </v-btn>

      <v-btn v-if="isLogin" @click="logout" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Navbar",
  computed: {
    ...mapState(["isLogin", "user"])
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.commit("SET_IS_LOGIN", false);
      this.$store.commit("SET_USER", {});
      this.$router.push("/signin");
    }
  },
  created() {
    // console.log(this.user.admin, 'ya')
  }
};
</script>
<style scoped>
.navbar {
  padding-left: 20vh;
  padding-right: 20vh;
}
</style>
