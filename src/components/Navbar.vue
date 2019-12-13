
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
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" v-if="isLogin">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
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
  }
}

</script>
<style scoped>
</style>
