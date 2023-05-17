<template>
  <CountriesList msg="Welcome to coutries catalog list"/>
</template>

<script>
import CountriesList from './components/CountriesList.vue'

export default {
  name: 'App',
  components: {
    CountriesList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
