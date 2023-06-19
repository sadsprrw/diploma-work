<template>
  <transition appear name="fade-down">
    <slot/>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({ name: 'TransitionFadeDown' })
export default class TransitionFadeDown extends Vue {
  constructor() {
    super();
  }
}
</script>

<style lang="scss" scoped>
.fade-down {
  &-enter, &-leave-to {
    opacity: 0;
  }

  &-enter {
    transform: translateY(-10px);
  }

  &-leave-to {
    transform: translateY(10px);
  }

  &-enter-active, &-leave-active {
    transition: transform .3s ease-in-out, opacity .3s ease-in-out;
  }
}
</style>
