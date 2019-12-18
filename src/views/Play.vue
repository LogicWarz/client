<template>
  <div class="play custom-font">
    <v-row>
      <v-col cols="12" sm="4" style="height: 90vh;" class="scroll challenge-container">
        <v-row></v-row>
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
        <span class="ml-3">
          Timer:
          <b>{{time}}</b>
        </span>
        <hr />
        <div>
          <h3 class="mt-4">{{room.challenge.title}}</h3>
        </div>
        <div v-html="room.challenge.description"></div>
      </v-col>
      <v-col cols="12" sm="8" style="padding-left: 20px">
        <div style="height: 50vh;">
          <Editor :skeletonCode="room.challenge.skeletonCode" @setUserSolution="setUserSolution"></Editor>
        </div>
        <div class="pl-4">
          <v-row>
            <v-col sm="3">
              <v-btn color="warning" @click="runTestCase">Run Test Case</v-btn>
            </v-col>

            <v-col sm="2">
              <v-btn rounded class="primary-gradient" @click="submitSolution(room.level)">
                <b>Submit</b>
              </v-btn>
            </v-col>
            <v-col sm="7"></v-col>
          </v-row>
        </div>
        <div style="height: 29vh; overflow: scroll" class="pl-4 pr-4">
          <span
            class="mr-10 mt-2 clickable"
            @click="testCaseResult = ''"
            style="color: purple; position: fixed; right: 0"
          >Clear Log</span>
          <div
            class="pa-5 console-font"
            v-html="testCaseResult"
            style="min-height: 100%; background: white; border-radius: 10px"
          ></div>
        </div>
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
      time: "",
      testaja: 0,
      testCaseResult: ""
    };
  },
  components: {
    Editor
  },
  methods: {
    setUserSolution(userSolution) {
      this.userSolution = userSolution;
    },

    async runTestCase() {
      try {
        let obj = {
          code: this.userSolution,
          challenge: this.room.challenge
        };
        this.testCaseResult += "== RUNNING TEST CASES ==<br><br>";
        // console.log('ini challenge yaaa', obj.challenge)
        const { data } = await this.$store.dispatch("parsingTestCase", obj);
        console.log(data.input);
        const testCases = this.room.challenge.testCase;
        testCases.forEach((testCase, i) => {
          this.testCaseResult += "== INPUT ==<br>";
          this.testCaseResult += JSON.stringify(testCase.input) + "<br><br>";
          if (
            JSON.stringify(data.input[i]) === JSON.stringify(testCase.output)
          ) {
            this.testCaseResult += `== OUTPUT ==<br>`;
            this.testCaseResult += `<b style="color: green">`;
            this.testCaseResult += JSON.stringify(data.input[i]) + "<br>";
            this.testCaseResult += `<< CORRECT >><br><br>`;
            this.testCaseResult += `</b>`;
          } else {
            this.testCaseResult += `== OUTPUT ==<br>`;
            this.testCaseResult += `<b style="color: red">`;
            this.testCaseResult += `<< WRONG >><br>`;
            this.testCaseResult += `<< OUTPUT: ${JSON.stringify(
              data.input[i]
            )} >><br>`;
            this.testCaseResult += `</b>`;
            this.testCaseResult += `<b style="color: green">`;
            this.testCaseResult += `<< EXPECTED OUTPUT: ${JSON.stringify(
              testCase.output
            )} >><br><br>`;
            this.testCaseResult += `</b>`;
          }
        });
      } catch (err) {
        errorHandler(err);
      }
    },
    async submitSolution(level) {
      console.log(this.time);
      // console.log("ini room yaaa", this.room);
      this.$store.commit("SET_LOADING", true);
      let obj = {
        code: this.userSolution,
        challenge: this.room.challenge
      };

      // console.log('ini challenge yaaa', obj.challenge)
      const { data } = await this.$store.dispatch("parsingData", obj);
      console.log("dispatch parsing data", data.input);
      if (data.input) {
        let point = 0;
        if (level == "beginner") {
          point = 10;
        } else if (level == "intermediate") {
          point = 20;
        } else if (level == "advance") {
          point = 30;
        }
        socket.emit("remove-room");
        console.log("sebelum axios update");
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
        console.log("sesudah axios update");
        const response = await axios({
          method: "delete",
          url: `/rooms/success/${this.$route.params.room}`,
          headers: {
            token: localStorage.getItem("token")
          }
        });
        console.log("sesudah delete room ....");
        this.$store.commit("SET_LOADING", false);
        // console.log("ini state user", this.user);
        this.$store.commit("SET_WINNER", this.user);
        // console.log("ini adalah room nya", this.room.players);
        let losers = this.room.players.filter(player => {
          return player._id != this.user._id;
        });
        this.$store.commit("SET_LOSERS", losers);
        socket.emit("success-challenge", {
          id: this.user,
          room: this.$route.params.room
        });
      } else {
        this.$store.commit("SET_LOADING", false);
        errorHandler({ data });
      }
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
      this.testaja = 10;
      const timer = setInterval(async () => {
        this.time = `${Math.floor(this.testaja / 60)} : ${this.testaja % 60}`;
        this.testaja -= 1;
        if (this.testaja === 0) {
          const response = await axios({
            method: "delete",
            url: `/rooms/success/${this.$route.params.room}`,
            headers: {
              token: localStorage.getItem("token")
            }
          });
          socket.emit("success-challenge", {
            id: null,
            room: this.$route.params.room
          });
          clearInterval(timer);
        }
      }, 1000);
    } else if (this.$store.state.oneRoom.level == "intermediate") {
      this.testaja = 1200;
      const timer = setInterval(async () => {
        this.time = `${Math.floor(this.testaja / 60)} : ${this.testaja % 60}`;
        this.testaja -= 1;
        if (this.testaja === 0) {
          const response = await axios({
            method: "delete",
            url: `/rooms/success/${this.$route.params.room}`,
            headers: {
              token: localStorage.getItem("token")
            }
          });
          socket.emit("success-challenge", {
            id: null,
            room: this.$route.params.room
          });
          clearInterval(timer);
        }
      }, 1000);
    } else if (this.$store.state.oneRoom.level == "advance") {
      this.testaja = 1800;
      const timer = setInterval(async () => {
        this.time = `${Math.floor(this.testaja / 60)} : ${this.testaja % 60}`;
        this.testaja -= 1;
        if (this.testaja === 0) {
          const response = await axios({
            method: "delete",
            url: `/rooms/success/${this.$route.params.room}`,
            headers: {
              token: localStorage.getItem("token")
            }
          });
          socket.emit("success-challenge", {
            id: null,
            room: this.$route.params.room
          });
          clearInterval(timer);
        }
      }, 1000);
    }

    // this.$store.dispatch("fetchRoom");
    this.$store.dispatch("fetchRoomId", { id: this.$route.params.room });
    socket.emit("in-game");
    socket.on("inGame", msg => {
      this.$store.dispatch("fetchRoomId", { id: this.$route.params.room });
    });

    socket.on("remove-room", () => {
      socket.emit("getRoom", this.$route.params.room);
      // this.$store.dispatch("fetchRoom");
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
