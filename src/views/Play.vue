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
        <div v-html="room.challenge.description">
        </div>
      </v-col>
      <v-col cols="12" sm="8" style="padding: 0">
        <v-row style="height: 50vh;">
          <Editor @setUserSolution="setUserSolution"></Editor>
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
              <v-btn color="warning" @click="submitSolution">
                <b>Submit</b>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="scroll" style="background: #ECE9FE; height: 30vh; width: 60vw;">
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
import errorHandler from '../utils/errorHandler';
// console.log(editor.value, 'value')
export default {
  name: "play",
  data() {
    return {
      userSolution: ""
    };
  },
  components: {
    Editor
  },
  methods: {
    setUserSolution(userSolution) {
      this.userSolution = userSolution;
    },
    async submitSolution() {
      console.log("ini room yaaa", this.room);
      // console.log("ini solution nya ya", this.userSolution);
      let obj = {
        code: this.userSolution,
        challenge: this.room.challenge
      };

      console.log("ini challenge yaaa", obj.challenge);
      const { data } = await this.$store.dispatch("parsingData", obj);
      console.log("masuk", data.input);
      if (data.input) {
        const response = await axios({
          method: "delete",
          url: `/rooms/success/${this.$route.params.room}`,
          headers: {
            token: localStorage.getItem("token")
          }
        });
        this.$store.commit("SET_WINNER", localStorage.getItem("id"));
        socket.emit("remove-room");
        socket.emit("success-challenge", {
          id: localStorage.getItem("id"),
          room: this.$route.params.room
        });
      } else {
        errorHandler({ data })
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
    }
  },
  created() {
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
      this.$router.push(`/result/${this.$route.params.room}`);
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
