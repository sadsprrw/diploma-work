<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App'
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  height: 100%;
  background-color: #232836;
  background-image: url("../public/bg.webp");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
