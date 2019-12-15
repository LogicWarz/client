<template>
  <div class="about">
    <h1>HAI</h1>
    <h6>{{newUser}}</h6>
    {{listPlayer.status}}
    <div v-for="(item,index) in listPlayer.players" :key="index">
      <span>{{index+1}}</span> :
      <span>{{item}}</span>
    </div>
    <button @click="playGame(listPlayer._id)" v-if="listPlayer.players.length >= 2">Play</button>
    <button @click="leaveRoom(listPlayer._id)" v-if="listPlayer.status === 'open'">Leave</button>
  </div>
</template>

<script>
import axios from "../../apis/axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

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
      axios({
        method: "patch",
        url: `/rooms/play/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          // this.$store.commit("SET_INGAME_PLAYERS", data.room.players);
          return this.$store.dispatch("fetchRoomId", { id: data.room._id });
        })
        .then(() => {
          socket.emit("play-game", { id, msg: "game start" });
          setTimeout(() => {
            this.$router.push(`/editor/${this.$route.params.room}`);
          }, 300);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    leaveRoom(id) {
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
          return this.$store.dispatch("fetchRoomId", { id: data.room._id });
        })
        .then(() => {
          socket.emit("leave-room", { id, msg: "testQueen is disconnected" });
          this.$router.push("/home");
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  computed: {
    listPlayer() {
      return this.$store.state.oneRoom;
    }
  },
  created() {
    this.$store.dispatch("fetchRoomId", { id: this.$route.params.room });

    socket.on("joinRoom", data => {
      if (data.id === this.$route.params.room) {
        this.$store.dispatch("fetchRoom");
        this.newUser = data.msg;
        this.$store
          .dispatch("fetchRoomId", { id: data.id })
          .then(data => {
            if (data.room.players.length === 2) {
              socket.emit("play-game", {
                id: data.room._id,
                msg: "game start"
              });
              this.$router.push(`/editor/${this.$route.params.room}`);
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
      this.$store.dispatch("fetchRoomId", { id: data.id });
      this.$router.push(`/editor/${this.$route.params.room}`);
    });
  }
};
</script>

<style>
</style>
