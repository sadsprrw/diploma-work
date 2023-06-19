<template>
  <div>
    <SRInput
        v-model="inputName"
        class="filter-input"
        placeholder="Enter song names"
        @input="onInput"
        v-click-outside="onClose"
    />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import HttpServiceInstance from "@/services/HTTP/HttpService";
import Vue from "vue";
import { namespace } from "vuex-class";

const userModule = namespace('UserModule');
@Component({
  name: "FormInput",
})
export default class FormInput extends Vue {

  @userModule.Mutation setCalculatedResults: (results: any) => void;

  private inputName: string = '';

  async onInput() {
    if (this.inputName.length >= 3) {
      const res: any = await HttpServiceInstance.main.searchSong(this.inputName);
      if (res.data.length) {
        this.$emit('show', res.data);
      }
    }
  }

  onClose() {
    this.inputName = '';
  }

}
</script>

<style scoped lang="scss">

 .filter-input {

 }

</style>