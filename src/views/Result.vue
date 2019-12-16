<template>
  <div class="about mb-10">
    <div>{{ winner}}</div>
    <div>{{newUser}}</div>
    <hr />
    <div>{{loser}}</div>
    <v-container>
      <v-row>
        <v-col sm="6" class="lobby-container bg-white-fade elevated pa-5 center-item">
          <div>
            <h3>Winner</h3>
          </div>
          <v-row>
            <v-col>
              <div>
                <v-avatar size="150">
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-avatar>
              </div>
              <div class="mt-3">John Watts</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="n in 3" :key="n" sm="4">
              <v-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
              </v-avatar>
              <div class="mt-3">
                <small>John Watts</small>
              </div>
            </v-col>
          </v-row>
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
                <v-avatar>
                  <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-avatar>
              </v-badge>
            </v-col>
            <v-col>
              <span class="ml-3" style="color: grey">
                <b>{{ player.name }}</b>
              </span>
            </v-col>
            <v-col sm="3">
              <v-chip class="ma-2" color="green" text-color="white">
                Beginner
                <v-icon right>mdi-star</v-icon>
              </v-chip>
            </v-col>
            <v-col sm="2">
              <v-img src="../assets/beginner.png" max-height="70px" max-width="70px"></v-img>
            </v-col>
          </v-row>
        </v-col>
        <v-col sm="6">
          <div>
            <vue-typed-js :strings="['Player name wins!']">
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
      player: []
    };
  },
  methods: {},
  computed: {
    loser() {
      if (this.$store.state.winner) {
        return this.$store.state.oneRoom.players.filter(player => {
          return player._id != this.$store.state.winner;
        });
      } else {
        return this.$store.state.oneRoom.players.filter(player => {
          return player._id != this.newUser;
        });
      }
    },
    listPlayer() {
      return this.$store.state.oneRoom;
    },
    winner() {
      return this.$store.state.winner;
    }
  },
  created() {
    console.log("ini winner nya ya", this.$store.state.winner);
    if (this.$store.state.winner) {
      this.$confetti.start({
        particlesPerFrame: 0.2
      });
    }
    if (this.$store.state.winner) {
      // let testTemp = this.$store.state.oneRoom.players.filter(player => {
      //   player._id != localStorage.getItem("id");
      // });
      socket.emit("wadidaw", { winner: localStorage.getItem("id") });
    }
    socket.on("jiwa", data => {
      console.log("ini dia ====", data);
      this.newUser = data;
    });
    this.$store.dispatch("fetchRoomId", { id: this.$route.params.room });
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
