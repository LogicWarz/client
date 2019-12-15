<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      class="mx-auto elevated room clickable bg-white-fade"
      :elevation="hover ? 5 : 'none'"
      opacity="0.5"
      :style="hover? 'opacity: 1;' : 'opacity: 0.9'"
      shaped
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            <v-chip
              @click="deleteRoom(room._id)"
              color="green"
              text-color="white"
              x-small
            >{{ room.level }}</v-chip>
          </div>
          <v-list-item-title
            @click="joinRoom(room._id, room.status)"
            class="headline mb-1"
          >{{ room.title }}</v-list-item-title>
          <v-list-item-subtitle>
            <small>{{ room.status }}</small>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-badge color="purple" style="margin-right: 10px">
          <template v-slot:badge>
            <b>
              <small>129</small>
            </b>
          </template>
          <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-badge>
      </v-list-item>
    </v-card>
  </v-hover>
</template>

<script>
import axios from "../../apis/axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

export default {
  name: "Room",
  props: ["room"],
  data() {
    return {
      username: "satyo"
    };
  },
  methods: {
    joinRoom(roomId, status) {
      this.$store
        .dispatch("joinRoom", { id: roomId, name: this.username })
        .then(data => {
          this.$store.dispatch("fetchRoom");
          this.$router.push(`/lobby/${roomId}`);
          socket.emit("join-room", {
            id: roomId,
            msg: `${this.username} is now connected`
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteRoom(roomId) {
      axios({
        method: "delete",
        url: `/rooms/${roomId}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          socket.emit("remove-room");
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  }
};
</script>
<style scoped>
.room {
  padding: 10px;
}
</style>
