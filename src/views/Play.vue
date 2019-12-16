<template>
  <div class="play custom-font">
    <v-row style="height: 90vh;">
      <v-col cols="12" sm="4" style="height: 90vh;" class="scroll challenge-container">
        <v-chip v-if="room.level === 'Beginner'"
          color="green"
          text-color="white"
          small
        >
          <b>{{room.level}}</b>
          <v-icon size="small" right>mdi-star-outline</v-icon>
        </v-chip>
        <v-chip v-else-if="room.level === 'Intermediate'"
          color="blue"
          text-color="white"
          small
        >
          <b>{{room.level}}</b>
          <v-icon size="small" right>mdi-star-half</v-icon>
        </v-chip>
        <v-chip v-else
          color="red"
          text-color="white"
          small
        >
          <b>{{room.level}}</b>
          <v-icon size="small" right>mdi-star</v-icon>
        </v-chip>
        <hr />
        <div>
          <h3 class="mt-4">First Factorial</h3>
        </div>
        <div>
          Have the function
          <span class="code-text">FirstFactorial(num)</span> take the num parameter being passed and return the factorial of it. For example: if num = 4, then your program should return (4 * 3 * 2 * 1) = 24. For the test cases, the range will be between 1 and 18 and the input will always be an integer.
          <span class="code-text">FirstFactorial(num)</span> take the num parameter being passed and return the factorial of it. For example: if num = 4, then your program should return (4 * 3 * 2 * 1) = 24. For the test cases, the range will be between 1 and 18 and the input will always be an integer.
          <span class="code-text">FirstFactorial(num)</span> take the num parameter being passed and return the factorial of it. For example: if num = 4, then your program should return (4 * 3 * 2 * 1) = 24. For the test cases, the range will be between 1 and 18 and the input will always be an integer.
          <span class="code-text">FirstFactorial(num)</span> take the num parameter being passed and return the factorial of it. For example: if num = 4, then your program should return (4 * 3 * 2 * 1) = 24. For the test cases, the range will be between 1 and 18 and the input will always be an integer.

        </div>
        <div>
          <h3 class="mt-4">Examples</h3>
        </div>
        <div>
          <code class="full-width">
            Input: 4
            <br />Output: 24
          </code>
        </div>
<<<<<<< HEAD

=======
>>>>>>> d48e0cd21e748d96b0a13997a70d158a333a6088
      </v-col>
      <v-col cols="12" sm="8" style="padding: 0">
        <v-row style="height: 50vh;">
          <Editor @setUserSolution="setUserSolution"></Editor>
        </v-row>
        <v-row>
          <v-row style="height: 10vh;">
            <v-col cols="12" sm="5">
              <v-text-field
              outlined
              dense
            ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1">
            <v-btn rounded class="primary-gradient" @click="submitSolution">Run</v-btn>
            </v-col>
            <v-col cols="12" sm="3">
            <v-btn class="bg-white-fade" @click="submitSolution">Run Test Case</v-btn>
            </v-col>
            <v-col cols="12" sm="3">
            <v-btn color="warning" @click="submitSolution"><b>Submit</b></v-btn>
            </v-col>
          </v-row>
          <v-row class="scroll" style="background: #ECE9FE; height: 30vh; width: 60vw;">
              ddqwdqd<br>ddqwdqd<br>ddqwdqd<br>ddqwdqd<br>ddqwdqd<br>ddqwdqd<br>ddqwdqd<br>ddqwdqd<br>ddqwdqd<br>ddqwdqd<br>ddqwdqd<br>ddqwdqd<br>ddqwdqd<br>ddqwdqd<br>
          </v-row>
        </v-row>
        
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "../../apis/axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");
// @ is an alias to /src
import Editor from '../components/Editor'
// console.log(editor.value, 'value')
export default {
  name: "play",
  data () {
    return {
      userSolution: ''
    }
  },
  components: {
    Editor
  },
  methods: {
    setUserSolution(userSolution) {
      this.userSolution = userSolution
    },
    submitSolution () {
      this.$store.dispatch("parsingData", this.userSolution).then(({ data }) => {
        console.log(data);
      });
      axios({
        method: "delete",
        url: `/rooms/success/${this.$route.params.room}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          socket.emit("remove-room");
          socket.emit("success-challenge");
          setTimeout(() => {
            this.$router.push(`/result/${this.$route.params.room}`);
          }, 300);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  computed: {
    room() {
      return this.$store.state.oneRoom
    }
  },
  created() {
    this.$store.dispatch("fetchRoomId", { id: this.$route.params.room });
    socket.emit("in-game");
    socket.on("inGame", msg => {
      this.$store.dispatch("fetchRoomId", { id: this.$route.params.room });
    });

    socket.on("remove-room", () => {
      this.$store.dispatch("fetchRoom");
    });
    socket.on("successChallenge", () => {
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
