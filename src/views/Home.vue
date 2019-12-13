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
        absolute
        dark
        fab
        right
        fixed
        style="margin-right: 3vw"
        @click="dialog = true"
        class="primary-gradient"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    <v-container>
      <v-col v-for="n in 11" :key="n" sm="4">
        <Room></Room>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import Room from '../components/Room'

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
  }
}
</script>

<style scoped>
</style>
