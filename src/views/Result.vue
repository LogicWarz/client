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
    <!-- <div>{{loser}}</div>
    <hr />
    <div>{{winner}}</div> -->
    <div class="center-item mt-2 mb-5">
      <v-btn text @click="$router.push('/')" rounded class="primary-gradient">
        <b>BACK TO ROOM LIST</b>
      </v-btn>
    </div>
    <v-container>
      <v-row>
        <v-col sm="6" class="lobby-container bg-white-fade elevated pa-5 center-item">
          <div>
            <h3>Winner</h3>
          </div>
          <v-row>
            <v-col>
              <div>
                <v-avatar size="150" class="primary-gradient">
                  <span v-if="winner.id.name" class="white--text" style="font-size: 5rem; font-weight: bold">{{winner.id.name.substring(0, 1).toUpperCase()}}</span>
                </v-avatar>
              </div>
              <div class="mt-3">{{winner.id.name}}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="player in loser" :key="player._id" sm="4">
              <v-avatar color="white">
                <span><b>{{player.name.substring(0, 1).toUpperCase()}}</b></span>
              </v-avatar>
              <div class="mt-3">
                <small>{{ player.name }}</small>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col sm="6">
          <div>
            <vue-typed-js :strings="[`${winner.id.name} wins!`]">
              <h3 style="margin: auto;" class="typing"></h3>
            </vue-typed-js>
            <v-img style="margin: auto;" src="../assets/win.gif" max-height="50vh" max-width="50vh"></v-img>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import io from "socket.io-client";
import axios from "../../apis/axios";
import Typed from "typed.js";
const socket = io.connect("http://localhost:3000");

export default {
  name: "Lobby",
  data() {
    return {
      newUser: null,
      // loser: [],
      player: []
    };
  },
  methods: {},
  computed: {
    loser() {
      return this.$store.state.losers;
      console.log("ini new user ======", this.newUser);
    },
    listPlayer() {
      return this.$store.state.oneRoom;
    },
    winner() {
      return this.$store.state.winner;
    }
  },
  // watch: {
  //   newUser() {
  //     if (this.newUser) {
  //       if (this.$store.state.winner) {
  //         this.loser = this.$store.state.oneRoom.players.filter(player => {
  //           return player._id != this.$store.state.winner;
  //         });
  //       } else {
  //         // console.log("ini new user ======", this.newUser);
  //         this.loser = this.$store.state.oneRoom.players.filter(player => {
  //           return player._id != this.newUser._id;
  //         });
  //       }
  //     }
  //   }
  // },
  created() {
    this.$store.dispatch("fetchRoomId", { id: this.$route.params.room });
    console.log("ini winner nya ya", this.$store.state.winner.id);
    if (this.$store.state.winner.id._id === localStorage.getItem("id")) {
      this.$confetti.start({
        particlesPerFrame: 0.2
      });
    }
    if (this.$store.state.winner) {
      console.log("harusnya masukkk disini");
      socket.emit("wadidaw", {
        winner: this.$store.state.user,
        room: this.$route.params.room
      });
    }
    socket.on("sendWinner", data => {
      console.log("ini dia ====", data);
      this.newUser = data;
    });
    setTimeout(() => {
      this.$router.push("/");
    }, 5000);
  },
  beforeDestroy() {
    console.log("ini before destroy");
    this.$confetti.stop();
  }
};
</script>

<style>
</style>
