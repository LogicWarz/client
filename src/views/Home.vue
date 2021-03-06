<template>
  <div class="home">
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="primary-gradient" primary-title>
          <b>Create Room</b>
        </v-card-title>
        <div style="padding: 20px">
          <v-alert text prominent dense type="error" icon="mdi-alert" class="mt-4" v-if="message">
            <small>{{ message }}</small>
          </v-alert>
          <v-text-field label="Room Name" outlined dense v-model="roomName"></v-text-field>
          <!-- <v-select :items="levels" label="Level" dense outlined v-model="level"></v-select> -->
          <v-row align="center" justify="center" class="center-item">
            <v-col
              class="zoom-hover clickable"
              @click="createRoom(level)"
              v-for="(level, i) in levels"
              :key="i"
            >
              <div>
                <v-img
                  :src="require(`../assets/${level.toLowerCase()}.png`)"
                  max-height="100px"
                  max-width="100px"
                  style="margin: auto;"
                ></v-img>
              </div>
              <div>
                <v-chip
                  v-if="level === 'beginner'"
                  class="ma-2"
                  color="green"
                  text-color="white"
                  small
                >
                  <b>{{level}}</b>
                  <v-icon size="small" right>mdi-star-outline</v-icon>
                </v-chip>
                <v-chip
                  v-else-if="level === 'intermediate'"
                  class="ma-2"
                  color="blue"
                  text-color="white"
                  small
                >
                  <b>{{level}}</b>
                  <v-icon size="small" right>mdi-star-half</v-icon>
                </v-chip>
                <v-chip v-else class="ma-2" color="red" text-color="white" small>
                  <b>{{level}}</b>
                  <v-icon size="small" right>mdi-star</v-icon>
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </div>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" text @click="createRoom">ADD ROOM</v-btn>
        </v-card-actions>-->
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
      <v-row class="pl-5">
        <v-col sm="1">
          <v-avatar size="100" class="orange-gradient">
            <span
              v-if="user.name"
              class="white--text"
              style="font-size: 4rem; font-weight: bold"
            >{{user.name.substring(0, 1).toUpperCase()}}</span>
          </v-avatar>
        </v-col>
        <v-col sm="2" class="pl-10">
          <div>
            <b>{{user.name}}</b>
          </div>
          <div style="color: grey">{{user.email}}</div>
          <div style="font-size: 25px; color: #5A0EE1; font-weight: bold; opacity: 0.8;">
            <div>{{user.points}} points</div>
          </div>
          <div>
            <v-chip v-if="user.points < 100" color="green" text-color="white" small>
              <b>Beginner</b>
              <v-icon small right>mdi-star-outline</v-icon>
            </v-chip>
            <v-chip v-else-if="user.points < 200" color="blue" text-color="white" x-small>
              <b>Intermediate</b>
              <v-icon size="small" right>mdi-star-half</v-icon>
            </v-chip>
            <v-chip v-else color="red" text-color="white" x-small>
              <b>Advance</b>
              <v-icon size="small" right>mdi-star</v-icon>
            </v-chip>
          </div>
        </v-col>
        <!-- <v-col sm="8">
          <div style="font-size: 25px; color: #5A0EE1; font-weight: bold; opacity: 0.8;">
            <div>{{user.points}} points</div>
          </div>
        </v-col> -->
      </v-row>
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
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    Room
  },
  data() {
    return {
      dialog: false,
      roomName: "",
      levels: ["beginner", "intermediate", "advance"],
      name: "testQueen",
      err: "",
      roomData: []
    };
  },
  methods: {
    createRoom(level) {
      this.$store.commit("SET_LOADING", true);
      this.$store
        .dispatch("createRoom", {
          title: this.roomName,
          level,
          player: this.name
        })
        .then(room => {
          this.$store.commit("SET_LOADING", false);
          socket.emit("getRoom", room);
          this.$store.dispatch("fetchRoomId", { id: room._id });
          this.$router.push(`/lobby/${room._id}`);
          this.roomName = "";
        })
        .catch(err => {
          this.$store.commit("SET_LOADING", false);
          err.data
            ? this.$store.commit("SET_MESSAGE", err.data.message)
            : this.$store.commit(
                "SET_MESSAGE",
                `couldn't connect to the server`
              );
          setTimeout(() => {
            this.$store.commit("SET_MESSAGE", "");
          }, 2000);
        });
    }
  },
  computed: {
    getRooms() {
      return this.$store.state.allRoom;
    },
    ...mapState(["message", "user"])
  },
  created() {
    this.$confetti.stop();
    this.$store.commit("SET_WINNER", null);
    if (localStorage.getItem("token")) {
      this.$store.dispatch("fetchRoom");
      this.$store
        .dispatch("getUserData")
        .then(response => {
          // console.log("==============>", this.user.name);
          this.$store.commit("SET_USER", response.data);
        })
        .catch(err => {
          this.danger(err.response.data.message);
        });
    }

    socket.on("getRoom", data => {
      this.$store.dispatch("fetchRoom");
    });

    socket.on("roomGone", () => {
      this.$store.dispatch("fetchRoom");
    });

    socket.on("closing", () => {
      this.$store.dispatch("fetchRoom");
    });

    socket.on("remove-room", () => {
      this.$store.dispatch("fetchRoom");
    });
  }
};
</script>

<style scoped>
</style>
