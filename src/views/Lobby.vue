<template>
  <div class="about mb-10">
    <!-- <h1>HAI</h1> -->
    <!-- <h6>{{newUser}}</h6> -->
    <!-- {{listPlayer.status}}
    <div v-for="(item,index) in listPlayer.players" :key="index">
      <span>{{index+1}}</span> :
      <span>{{item}}</span>
    </div>-->
    <!-- <button @click="playGame(listPlayer._id)" v-if="listPlayer.players.length >= 2">Play</button> -->
    <!-- <button @click="leaveRoom(listPlayer._id)" v-if="listPlayer.status === 'open'">Leave</button> -->
    <!-- {{listPlayer}} -->
    <div class="center-item mt-10">
      <v-btn
        text
        @click="playGame(listPlayer._id)"
        v-if="listPlayer.players.length >= 2 && user._id === listPlayer.players[0]._id"
        rounded
        class="primary-gradient"
      >
        <b>PLAY</b>
      </v-btn>
      <v-btn
        color="warning"
        text
        @click="leaveRoom(listPlayer._id)"
        v-if="listPlayer.status === 'open'"
      >
        <b>LEAVE ROOM</b>
      </v-btn>
    </div>
    <v-container>
      <v-row>
        <v-col sm="6">
          <div>
            <vue-typed-js :strings="['Prepare for battle']">
              <h3 class="typing"></h3>
            </vue-typed-js>
            <v-img
              style="margin: auto;"
              src="../assets/lobby.png"
              max-height="50vh"
              max-width="50vh"
            ></v-img>
          </div>
        </v-col>
        <v-col sm="6" class="lobby-container bg-white-fade elevated pa-5">
          <div>
            <h3>Players</h3>
          </div>
          <v-row
            v-for="player in listPlayer.players"
            :key="player._id"
            justify="center"
            align="center"
          >
            <v-col sm="2">
              <v-badge color="orange">
                <template v-slot:badge>
                  <b>
                    <small>{{player.points}}</small>
                  </b>
                </template>
                <v-avatar class="primary-gradient" style="font-size: 2rem">
                  <span>
                    <b>{{player.name.substring(0, 1).toUpperCase()}}</b>
                  </span>
                </v-avatar>
              </v-badge>
            </v-col>
            <v-col>
              <span class="ml-3" style="color: grey">
                <b>{{ player.name }}</b>
              </span>
            </v-col>
            <v-col sm="3">
              <v-chip v-if="player.points < 100" color="green" text-color="white" x-small>
                <b>Beginner</b>
                <v-icon size="small" right>mdi-star-outline</v-icon>
              </v-chip>
              <v-chip v-else-if="player.points < 200" color="blue" text-color="white" x-small>
                <b>Intermediate</b>
                <v-icon size="small" right>mdi-star-half</v-icon>
              </v-chip>
              <v-chip v-else color="red" text-color="white" x-small>
                <b>Advance</b>
                <v-icon size="small" right>mdi-star</v-icon>
              </v-chip>
            </v-col>
            <v-col v-if="player.points < 100" sm="2">
              <v-img :src="require(`../assets/beginner.png`)" max-height="70px" max-width="70px"></v-img>
            </v-col>
            <v-col v-else-if="player.points < 200" sm="2">
              <v-img
                :src="require(`../assets/intermediate.png`)"
                max-height="70px"
                max-width="70px"
              ></v-img>
            </v-col>
            <v-col v-else sm="2">
              <v-img :src="require(`../assets/advance.png`)" max-height="70px" max-width="70px"></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "../../apis/axios";
import io from "socket.io-client";
import socket from "../socket/socket";
import Typed from "typed.js";
import { mapState } from "vuex";

export default {
  name: "Lobby",
  data() {
    return {
      newUser: "",
      player: []
    };
  },
  methods: {
    playGame(id) {
      this.$store.commit("SET_LOADING", true);
      axios({
        method: "patch",
        url: `/rooms/play/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          return this.$store.dispatch("fetchRoomId", { id: data.room._id });
        })
        .then(() => {
          this.$router.push(`/play/${this.$route.params.room}`);
          socket.emit("play-game", { id, msg: "game start" });
          socket.emit("room-closed");
          this.$store.dispatch("fetchRoom");
          this.$store.commit("SET_LOADING", false);
        })
        .catch(({ response }) => {
          this.$store.commit("SET_LOADING", false);
          console.log(response);
        });
    },
    leaveRoom(id) {
      let isAlone = false;
      this.$store.commit("SET_LOADING", true);
      if (this.listPlayer.players.length == 1) {
        isAlone = true;
      }
      axios({
        method: "patch",
        url: `/rooms/leave/${id}`,
        data: {
          player: "testQueen"
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          if (isAlone) {
            this.$store.commit("SET_LOADING", false);
            this.$router.push("/");
          } else {
            return this.$store.dispatch("fetchRoomId", { id: data.room._id });
          }
        })
        .then(() => {
          this.$store.commit("SET_LOADING", false);
          if (isAlone) {
            socket.emit("room-gone", { id });
          }
          if (!isAlone) {
            socket.emit("leave-room", { id, msg: "testQueen is disconnected" });
            this.$router.push("/");
          }
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  computed: {
    listPlayer() {
      return this.$store.state.oneRoom;
    },
    ...mapState(["user"])
  },
  beforeCreate() {
    // this.$store.dispatch("fetchRoomId", { id: this.$route.params.room });

    socket.on("joinRoom", data => {
      if (data.id === this.$route.params.room) {
        this.$store.dispatch("fetchRoom");
        this.newUser = data.msg;
        this.$store
          .dispatch("fetchRoomId", { id: data.id })
          .then(data => {
            if (data.room.players.length === 3) {
              socket.emit("play-game", {
                id: data.room._id,
                msg: "game start"
              });
              this.$router.push(`/play/${this.$route.params.room}`);
            }
          })
          .catch(err => {
            console.log(err);
          });
        setTimeout(() => {
          this.newUser = "";
        }, 2000);
      } else {
        this.$store.dispatch("fetchRoomId", { id: this.$route.params.room });
      }
    });

    socket.on("leaveRoom", data => {
      this.$store.dispatch("fetchRoom");
      if (data.id === this.$route.params.id) {
        this.newUser = data.msg;
        this.$store.dispatch("fetchRoomId", { id: data.id });
        setTimeout(() => {
          this.newUser = "";
        }, 2000);
      } else {
        this.$store.dispatch("fetchRoomId", { id: data.id });
      }
    });

    socket.on("playGame", data => {
      this.$store.dispatch("fetchRoom");
      this.$store.dispatch("fetchRoomId", { id: data.id });
      this.$router.push(`/play/${this.$route.params.room}`);
    });
  },
  created() {
    this.$store.dispatch("fetchRoomId", { id: this.$route.params.room });
  }
};
</script>

<style>
</style>
