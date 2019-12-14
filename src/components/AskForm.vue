<template>
  <v-container class="form-container bg-white-fade elevated pa-10">
    <v-text-field
      label="Title"
      dense
      outlined
      v-model="title"
    ></v-text-field>
    <!-- <v-textarea
      v-model="description"
      label="Content"
      auto-grow
      outlined
      rows="3"
      row-height="25"
      shaped
    ></v-textarea> -->
    <wysiwyg v-model="description" style="height: 100%; border-color: black; margin-bottom: 20px;" />
    <v-btn rounded class="primary-gradient" @click="addQuestion">
      <b>POST</b>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "askForm",
  data(){
    return {
      title: "",
      description: ""
    }
  },

  methods: {
    addQuestion() {
      let obj = {
        title: this.title,
        description: this.description,
        tags: ["testing", "testtt"]
      }

      this.$store.dispatch("addQuestion", obj)
        .then(() => {
          this.$router.push("/forum")
        })
        .catch(() => {
          console.log("Error")
        })
    }
  }
}
</script>

<style>

</style>