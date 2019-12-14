<template>
  <div>
    <MonacoEditor class="editor" v-model="testing" language="javascript" />
    <button @click="submitEvent">Submit</button>
  </div>
</template>

<script>
import io from "socket.io-client";
import axios from "../../apis/axios";
import MonacoEditor from "vue-monaco";
const socket = io.connect("http://localhost:3000");

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
      this.$store.dispatch("parsingData", this.testing).then(({ data }) => {
        console.log(data);
      });
      axios({
        method: "delete",
        url: `/rooms/${this.$route.params.room}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          socket.emit("remove-room");
          socket.emit("success-challenge");
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  created() {}
};
</script>

<style>
.editor {
  width: 900px;
  height: 70vh;
}
</style>
