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
            <v-chip v-if="room.level === 'Beginner'" color="green" text-color="white" x-small>
              <b>{{room.level}}</b>
              <v-icon size="small" right>mdi-star-outline</v-icon>
            </v-chip>
            <v-chip
              v-else-if="room.level === 'Intermediate'"
              color="blue"
              text-color="white"
              x-small
            >
              <b>{{room.level}}</b>
              <v-icon size="small" right>mdi-star-half</v-icon>
            </v-chip>
            <v-chip v-else color="red" text-color="white" x-small>
              <b>{{room.level}}</b>
              <v-icon size="small" right>mdi-star</v-icon>
            </v-chip>
            <!-- <v-chip
              @click="deleteRoom(room._id)"
              color="green"
              text-color="white"
              x-small
            >{{ room.level }}</v-chip>-->
          </div>
          <v-list-item-title
            @click="joinRoom(room._id, room.status)"
            class="headline mb-1"
          >{{ room.title }}</v-list-item-title>
          <v-list-item-subtitle>
            <small>{{ room.status }}</small>
          </v-list-item-subtitle>
        </v-list-item-content>
        <div style="text-align: right">
        <v-badge
          v-if="room.players[0]"
          color="orange"
          class="center-item"
          style="margin-right: 10px"
        >
          <template v-slot:badge>
            <small>
              <b>{{room.players[0].points + 'p'}}</b>
            </small>
          </template>
          <v-avatar color="white">
            <span><b>{{room.players[0].name.substring(0, 1).toUpperCase()}}</b></span>
          </v-avatar>
          <div style="color: grey">
            <small>{{room.players[0].name}}</small>
          </div>
        </v-badge>
        </div>
      </v-list-item>
    </v-card>
  </v-hover>
</template>

<script>
import axios from "../../apis/axios";
import socket from "../socket/socket";
import errorHandler from '../utils/errorHandler'

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
        .catch(errorHandler);
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
        .catch(errorHandler);
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
