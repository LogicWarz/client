<template>
  <div class="play custom-font">
    <v-row style="height: 90vh;">
      <v-col cols="12" sm="4" style="height: 90vh;" class="scroll challenge-container">
        <v-chip v-if="room.level === 'beginner'" color="green" text-color="white" small>
          <b>{{room.level}}</b>
          <v-icon size="small" right>mdi-star-outline</v-icon>
        </v-chip>
        <v-chip v-else-if="room.level === 'intermediate'" color="blue" text-color="white" small>
          <b>{{room.level}}</b>
          <v-icon size="small" right>mdi-star-half</v-icon>
        </v-chip>
        <v-chip v-else color="red" text-color="white" small>
          <b>{{room.level}}</b>
          <v-icon size="small" right>mdi-star</v-icon>
        </v-chip>
        <hr />
        <div>
          <h3 class="mt-4">{{room.challenge.title}}</h3>
        </div>
        <div v-html="room.challenge.description"></div>
      </v-col>
      <v-col cols="12" sm="8" style="padding: 0">
        <v-row style="height: 50vh;">
          <Editor :skeletonCode="room.challenge.skeletonCode" @setUserSolution="setUserSolution"></Editor>
        </v-row>
        <v-row>
          <v-row style="height: 10vh;">
            <v-col cols="12" sm="5">
              <v-text-field outlined dense></v-text-field>
            </v-col>
            <v-col cols="12" sm="1">
              <v-btn rounded class="primary-gradient" @click="submitSolution">Run</v-btn>
            </v-col>
            <v-col cols="12" sm="3">
              <v-btn class="bg-white-fade" @click="submitSolution">Run Test Case</v-btn>
            </v-col>
            <v-col cols="12" sm="3">
              <v-btn color="warning" @click="submitSolution(room.level)">
                <b>Submit</b>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="scroll" style="background: #ECE9FE; height: 30vh; width: 60vw;">
            {{time}}
            ddqwdqd
            <br />ddqwdqd
            <br />ddqwdqd
            <br />ddqwdqd
            <br />ddqwdqd
            <br />ddqwdqd
            <br />ddqwdqd
            <br />ddqwdqd
            <br />ddqwdqd
            <br />ddqwdqd
            <br />ddqwdqd
            <br />ddqwdqd
            <br />ddqwdqd
            <br />ddqwdqd
            <br />
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import socket from "../socket/socket";
import axios from "../../apis/axios";

// @ is an alias to /src
import Editor from "../components/Editor";
import errorHandler from "../utils/errorHandler";
// console.log(editor.value, 'value')
export default {
  name: "play",
  data() {
    return {
      userSolution: "",
      time: 0
    };
  },
  components: {
    Editor
  },
  methods: {
    setUserSolution(userSolution) {
      this.userSolution = userSolution;
    },
    async submitSolution(level) {
      let point = 0;
      if (level == "beginner") {
        point = 10;
      } else if (level == "intermediate") {
        point = 20;
      } else if (level == "advance") {
        point = 30;
      }
      // console.log("ini room yaaa", this.room);
      this.$store.commit("SET_LOADING", true);
      let obj = {
        code: this.userSolution,
        challenge: this.room.challenge
      };

      // console.log('ini challenge yaaa', obj.challenge)
      const { data } = await this.$store.dispatch("parsingData", obj);
      console.log("masuk", data.input);
      if (data.input) {
        const responsePoint = await axios({
          method: "patch",
          url: `/users/${localStorage.getItem("id")}`,
          headers: {
            token: localStorage.getItem("token")
          },
          data: {
            points: point
          }
        });
        const response = await axios({
          method: "delete",
          url: `/rooms/success/${this.$route.params.room}`,
          headers: {
            token: localStorage.getItem("token")
          }
        });
        this.$store.commit("SET_LOADING", false);
        console.log("ini state user", this.user);
        this.$store.commit("SET_WINNER", this.user);
        console.log("ini adalah room nya", this.room.players);
        let losers = this.room.players.filter(player => {
          return player._id != this.user._id;
        });
        this.$store.commit("SET_LOSERS", losers);
        socket.emit("remove-room");
        socket.emit("success-challenge", {
          id: this.user,
          room: this.$route.params.room
        });
      } else {
        this.$store.commit("SET_LOADING", false);
        errorHandler({ data });
      }
      // .then(({ data }) => {
      //   if (data.input) {
      //     return axios({
      //       method: "delete",
      //       url: `/rooms/success/${this.$route.params.room}`,
      //       headers: {
      //         token: localStorage.getItem("token")
      //       }
      //     });
      //   } else {
      //     console.log("ini salah ya");
      //   }
      // })
      // .then(() => {
      //   console.log("nice");
      // })
      // .catch(err => {
      //   console.log(err);
      // });
      // this.$store.commit("SET_WINNER", localStorage.getItem("id"));
      // socket.emit("remove-room");
      // socket.emit("success-challenge", {
      //   id: localStorage.getItem("id"),
      //   room: this.$route.params.room
      // });
      // this.$store
      //   .dispatch("parsingData", this.userSolution)
      //   .then(({ data }) => {
      //     console.log(data);
      //   });
      // axios({
      //   method: "delete",
      //   url: `/rooms/success/${this.$route.params.room}`,
      //   headers: {
      //     token: localStorage.getItem("token")
      //   }
      // })
      //   .then(({ data }) => {
      //     socket.emit("remove-room");
      //     socket.emit("success-challenge");
      //     setTimeout(() => {
      //       this.$router.push(`/result/${this.$route.params.room}`);
      //     }, 300);
      //   })
      //   .catch(({ response }) => {
      //     console.log(response);
      //   });
    }
  },
  computed: {
    room() {
      return this.$store.state.oneRoom;
    },
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    if (this.$store.state.oneRoom.level == "beginner") {
      this.time = 600;
      const timer = setInterval(() => {
        this.time -= 1;
        if (this.time === 0) {
          socket.emit("success-challenge", {
            id: null,
            room: this.$route.params.room
          });
          clearInterval(timer);
        }
      }, 1000);
    } else if (this.$store.state.oneRoom.level == "intermediate") {
      this.time = 1200;
      const timer = setInterval(() => {
        this.time -= 1;
        if (this.time === 0) {
          socket.emit("success-challenge", {
            id: null,
            room: this.$route.params.room
          });
          clearInterval(timer);
        }
      }, 1000);
    } else if (this.$store.state.oneRoom.level == "advance") {
      this.time = 1800;
      const timer = setInterval(() => {
        this.time -= 1;
        if (this.time === 0) {
          socket.emit("success-challenge", {
            id: null,
            room: this.$route.params.room
          });
          clearInterval(timer);
        }
      }, 1000);
    }
    this.$store.dispatch("fetchRoom");
    this.$store.dispatch("fetchRoomId", { id: this.$route.params.room });
    socket.emit("in-game");
    socket.on("inGame", msg => {
      this.$store.dispatch("fetchRoomId", { id: this.$route.params.room });
    });

    socket.on("remove-room", () => {
      socket.emit("getRoom", this.$store.state.oneRoom);
      this.$store.dispatch("fetchRoom");
    });
    socket.on("successChallenge", id => {
      console.log("-----==========", id);
      if (id.id != null) {
        this.$store.commit("SET_WINNER", id);
        console.log("disini success id", id);
        console.log("ini adalah room nya", this.room.players);
        let losers = this.room.players.filter(player => {
          return player._id != id.id._id;
        });
        this.$store.commit("SET_LOSERS", losers);
        this.$router.push(`/result/${this.$route.params.room}`);
      } else {
        console.log("pemain nya gagal smua");
        this.$store.commit("SET_LOSERS", this.room.players);
        this.$router.push(`/result/${this.$route.params.room}`);
      }
    });
  }
};
</script>

<style scoped>
.challenge-container {
  padding-left: 30px;
  padding-right: 30px;
}
hr {
  margin-top: 2vh;
  border-top: 1px solid #dbdbdb;
}
</style>
