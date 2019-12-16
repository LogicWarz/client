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
import socket from "../socket/socket";

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
  },
  created() {
    socket.on("joinRoom", data => {
      console.log("join-room triggered");
      // if (data.id === this.$route.params.room) {
      //   this.$store.dispatch("fetchRoom");
      //   this.newUser = data.msg;
      //   this.$store
      //     .dispatch("fetchRoomId", { id: data.id })
      //     .then(data => {
      //       if (data.room.players.length === 3) {
      //         socket.emit("play-game", {
      //           id: data.room._id,
      //           msg: "game start"
      //         });
      //         this.$router.push(`/editor/${this.$route.params.room}`);
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      //   setTimeout(() => {
      //     this.newUser = "";
      //   }, 2000);
      // } else {
      this.$store.dispatch("fetchRoomId", { id: data.id });
      // }
    });
  }
};
</script>
<style scoped>
.room {
  padding: 10px;
}
</style>
