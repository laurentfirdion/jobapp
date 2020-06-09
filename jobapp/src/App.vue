<template>
  <div id="app">
    <Nav />
    <b-container>
        <Joblist />
    </b-container>
    
  </div>
</template>

<script>
import Joblist from './components/Joblist.vue'
import Nav from './components/Nav.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'App',
  components: {
    Joblist,
    Nav
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  margin-bottom: 40px;
}
.serp {
  margin-top: 25px;
}

</style>
