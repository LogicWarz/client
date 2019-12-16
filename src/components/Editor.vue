<template>
  <div>
    <MonacoEditor class="editor" v-model="testing" language="javascript" />
    <button @click="submitEvent">Submit</button>
  </div>
</template>

<script>
// import io from "socket.io-client";
import axios from "../../apis/axios";
import MonacoEditor from "vue-monaco";
import socket from "../socket/socket";

export default {
  name: "Editor",
  components: {
    MonacoEditor
  },
  data() {
    return {
      testing: ""
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
    },

    submitEvent() {
      this.$store
        .dispatch("parsingData", this.testing)
        .then(({ data }) => {
          console.log(data);
          return axios({
            method: "delete",
            url: `/rooms/success/${this.$route.params.room}`,
            headers: {
              token: localStorage.getItem("token")
            }
          });
        })
        .then(() => {
          console.log("nice");
        })
        .catch(err => {
          console.log(err);
        });
      this.$store.commit("SET_WINNER", localStorage.getItem("id"));
      socket.emit("remove-room");
      socket.emit("success-challenge", {
        id: localStorage.getItem("id"),
        room: this.$route.params.room
      });
    }
  },
  computed: {
    getPlayers() {
      return this.$store.state.oneRoom.players;
    }
  }
};
</script>

<style>
.editor {
  width: 900px;
  height: 70vh;
}
</style>
