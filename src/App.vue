<template>
  <v-app class="app custom-font">
    <Navbar></Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  },
  data: () => ({
    //
  }),
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_IS_LOGIN', true)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css?family=Courier+Prime&display=swap');

.app {
  background: rgb(254,254,255) !important;
  background: linear-gradient(142deg, rgba(254,254,255,1) 0%, rgb(226, 222, 255) 50%, rgb(212, 204, 255) 100%) !important;
  font-family: 'Montserrat', sans-serif;
}
.bg-standard {
  background: #f9f8ff !important;
}
.bg-white-fade {
  background: rgb(255, 255, 255, 0.2) !important;
}
.elevated {
  box-shadow: 0px 0px 21px -5px rgba(0,0,0,0.15) !important;
  border: none !important;
}
.custom-font {
  font-family: 'Montserrat', sans-serif !important;
}
.float-right {
  float: right;
}
.full-width {
  width: 100%
}
code {
  border: none !important;
  box-shadow: none !important;
  background: #ede9ff !important;
  color: #4A00E0 !important;
  padding: 10px;
  text-align: left;
}
.code-text {
  font-family: 'Courier Prime', monospace;
  color: #4A00E0;
}
.m-auto {
  margin: auto;
}
.primary-gradient {
  color: #f1f1f1 !important;
  background: #8E2DE2;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4A00E0, #8E2DE2);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4A00E0, #8E2DE2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.center-item {
  text-align: center;
}
.center-self {
  margin: auto;
}
.clickable {
  cursor: pointer;
}
.text-primary {
  color: #4A00E0 !important;
}
</style>
