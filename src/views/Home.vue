<template>
  <div class="home">
    {{getRooms}}
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="primary-gradient" primary-title>Create Room</v-card-title>
        <div style="padding: 20px">
          <v-text-field label="Room Name" outlined dense v-model="roomName"></v-text-field>
          <v-select :items="levels" label="Level" dense outlined v-model="level"></v-select>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="createRoom">ADD ROOM</v-btn>
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
      <div class="center-item mt-5" v-if="getRooms.length === 0">
        No room yet. Go make one!
        <v-img src="../assets/empty.png" height="200" width="300" class="center-self mt-2"></v-img>
      </div>
      <v-row>
        <v-col v-for="(room, i) in getRooms" :key="i" cols="12" sm="4">
          <Room :room="room"></Room>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Room from "../components/Room";
import axios from "../../apis/axios";
import socket from "../socket/socket";

export default {
  name: "home",
  components: {
    Room
  },
  data() {
    return {
      dialog: false,
      roomName: "",
      levels: ["Mortal", "King", "Demigod", "God"],
      level: "",
      name: "testQueen",
      err: "",
      roomData: []
    };
  },
  methods: {
    createRoom() {
      this.$store
        .dispatch("createRoom", {
          title: this.roomName,
          level: this.level,
          player: this.name
        })
        .then(room => {
          socket.emit("getRoom", room);
          this.$store.dispatch("fetchRoomId", { id: room._id });
          this.$router.push(`/lobby/${room._id}`);
          this.roomName = "";
          this.level = "";
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    getRooms() {
      return this.$store.state.allRoom;
    }
  },
  created() {
    console.log("-=");
    if (localStorage.getItem("token")) {
      this.$store.dispatch("fetchRoom");
    }
    socket.on("getRoom", data => {
      this.$store.dispatch("fetchRoom");
    });

    socket.on("roomGone", () => {
      console.log("masuk");
      this.$store.dispatch("fetchRoom");
    });

    // socket.on("refreshRoom", () => {
    //   this.$store.dispatch("fetchRoom");
    // });

    socket.on("remove-room", () => {
      this.$store.dispatch("fetchRoom");
    });
  }
};
</script>

<style scoped>
</style>
