<template>
  <v-container class="form-container bg-white-fade elevated pa-10">
    <!-- <v-text-field
      label="Title"
      dense
      outlined
      v-model="title"
    ></v-text-field> -->
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

    <v-btn rounded class="primary-gradient" @click="editAnswer">
      <b>POST</b>
    </v-btn>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EditForm',
  data: () => ({
    description: ''
  }),
  methods: {
    getAnswerDetail () {
      this.$store.dispatch('getAnswerDetail', this.$route.params.id)
        .then((response) => {
          this.description = response.data.description
          this.$store.commit('SET_ANSWER_DETAIL', response.data)
        })
        .catch((err) => {
          console.log(err)
          // this.danger(err.response.data.message);
        })
    },
    editAnswer () {
      this.$store.dispatch('editAnswer', {
        description: this.description,
        AnswerId: this.$route.params.id
      })
        .then((response) => {
          // this.success('Answer edited successfully');
          this.$router.back()
        })
        .catch((err) => {
          console.log(err)
          // this.danger(err.response.data.message);
        })
    }
  },
  created () {
    this.getAnswerDetail()
  },
  computed: mapState(['answer_detail', 'user'])
}
</script>

<style>
.tag-input span.v-chip {
  background-color: #1976d2;
  color: #fff;
  font-size:1em;
  padding-left:7px;
}

.tag-input span.v-chip::before {
    content: "label";
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    /* -webkit-font-feature-settings: 'liga'; */
    -webkit-font-smoothing: antialiased;
}
</style>
