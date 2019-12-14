<template>
  <div class="play custom-font">
    <v-row style="height: 90vh">
      <v-col
        cols="12"
        sm="4"
        class="challenge-container"
      >
        <v-chip
          color="green"
          text-color="white"
          small
        >
          Beginner
        </v-chip>
        <hr>
        <div>
          <h3 class="mt-4">First Factorial</h3>
        </div>
        <div>
          Have the function <span class="code-text">FirstFactorial(num)</span> take the num parameter being passed and return the factorial of it. For example: if num = 4, then your program should return (4 * 3 * 2 * 1) = 24. For the test cases, the range will be between 1 and 18 and the input will always be an integer.
        </div>
        <div>
          <h3 class="mt-4">Examples</h3>
        </div>
        <div>
          <code class="full-width">Input: 4<br>Output: 24</code>
        </div>

        
      </v-col>
      <v-col
        cols="12"
        sm="8"
        style="padding: 0"
      >
        <v-row
        style="height: 70vh;"
        >
          <Editor></Editor>
        </v-row>
        <v-row
        style="height: 20vh;"
        align="center"
        >
          <v-col v-for="n in 4" :key="n" sm="3" class="center-item">
            <v-badge>
              <template v-slot:badge><b><small>129</small></b></template>
              <v-avatar>
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                >
              </v-avatar>
            </v-badge>
            <v-chip
              color="light"
              text-color="dark"
              small
            >
              John Watts
            </v-chip>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Editor from "../components/Editor";
// console.log(editor.value, 'value')
export default {
  name: 'play',
  data () {
    return {
      aa: ''
    }
  },
  methods: {
    
  },
  components: {
    Editor
  }
}
</script>

<style scoped>
.challenge-container {
  padding-left: 30px;
  padding-right: 30px;
}
hr {
  margin-top: 2vh;
  border-top: 1px solid #dbdbdb
}
</style>
