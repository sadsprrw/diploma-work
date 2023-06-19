<template>
  <div class="main-page">
    <MainForm/>
  </div>
</template>

<script lang="ts">

import {Component} from "vue-property-decorator";
import Vue from "vue";
import MainForm from "@/components/MainForm.vue";

@Component({
  name: "MainPage",
  components: { MainForm },
})
export default class MainPage extends Vue {


}
</script>

<style scoped lang="scss">
  .main-page {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient( rgba(35, 40, 54, 1) 0%,  rgba(35, 40, 54, 0.95) 25%,  rgba(35, 40, 54, 1) 100%);
  }
</style>