<template>
  <div class="home">
    <v-dialog
      v-model="dialog"
      width="500"
    >
    <v-card>
        <v-card-title
          class="primary-gradient"
          primary-title
        >
          Create Room
        </v-card-title>
        <div style="padding: 20px">
        <v-text-field
          label="Room Name"
          outlined
          dense
          v-model="roomName"
        ></v-text-field>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="addRoom"
          >
            ADD ROOM
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn
        fixed
        dark
        fab
        bottom
        right
        style="margin: 4vw"
        @click="dialog = true"
        class="primary-gradient"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    <v-container>
      <div class="center-item mt-5" v-if="rooms.length === 0">
        No room yet. Go make one!
         <v-img
          src="../assets/empty.png"
          height="200"
          width="300"
          class="center-self mt-2"
        ></v-img>
      </div>
      <v-row>
        <v-col
          v-for="(room, i) in rooms"
          :key="i"
          cols="12"
          sm="4"
        >
          <Room></Room>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Room from '../components/Room'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    Room
  },
  data () {
    return {
      dialog: false,
      roomName: ''
    }
  },
  methods: {
    addRoom () {
      alert(this.roomName)
      this.dialog = false
    }
  },
  computed: {
    ...mapState(['rooms'])
  }
}
</script>

<style scoped>
</style>
