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
    <v-flex xs12>
      <v-combobox multiple
                v-model="tags"
                label="Tags"
                append-icon
                chips
                deletable-chips
                class="tag-input"
                :search-input.sync="search"
                @keyup.tab="updateTags"
                @paste="updateTags">
      </v-combobox>
    </v-flex>
    <v-btn rounded class="primary-gradient" @click="addQuestion">
      <b>POST</b>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'askForm',
  data () {
    return {
      title: '',
      description: '',
      tags: [],
      search: '' // sync search
    }
  },
  methods: {
    addQuestion () {
      let obj = {
        title: this.title,
        description: this.description,
        tags: this.tags
      }

      this.$store.dispatch('addQuestion', obj)
        .then(() => {
          this.$router.push('/forum')
        })
        .catch(() => {
          console.log('Error')
        })
    },
    updateTags () {
      this.$nextTick(() => {
        this.tags.push(...this.search.split(','))
        this.$nextTick(() => {
          this.search = ''
        })
      })
    }
  }
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
