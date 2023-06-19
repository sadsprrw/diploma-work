<template>
  <loading-overlay
      v-if="isLoading"
      v-model:active="isLoading"
      :is-full-page="isFullPage"
      :opacity="opacity"
      :z-index="zIndex"
      background-color="black"
      color="#0095F0"
      loader="dots"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import type { Component as VueComponent } from "vue";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

@Component({
  name: 'SRLoader',
  components: { "loading-overlay": Loading as VueComponent }
})
export default class SRLoader extends Vue {
  @Prop({ type: Boolean, default: true }) readonly isFullPage: boolean;
  @Prop({ type: Boolean, required: true }) readonly isLoading: boolean;
  @Prop({ type: Number, default: 0.5 }) readonly opacity: number;
  @Prop({ type: Number, default: 9999 }) readonly zIndex: number;

  constructor() {
    super();
  }
}
</script>

<style lang="scss" scoped>
.fade {
  &-enter-active, &-leave-active {
    transition: opacity .3s ease-in-out;
  }
  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>