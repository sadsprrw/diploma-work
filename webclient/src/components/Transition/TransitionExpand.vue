<template>
  <transition
      @afterEnter="afterEnter"
      @enter="enter"
      @leave="leave"
      name="expand"
  >
    <slot/>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({ name: 'TransitionExpand' })
export default class TransitionExpand extends Vue {
  constructor() {
    super();
  }

  enter = (element: HTMLElement) => {
    element.style.position = 'absolute';
    element.style.visibility = 'hidden';
    element.style.maxHeight = 'none';

    const height: string = getComputedStyle(element).height;

    // element.style.position = null;
    // element.style.visibility = null;
    element.style.maxHeight = '0';

    setTimeout(() => element.style.maxHeight = height);
  };

  afterEnter = (element: HTMLElement) => element.style.maxHeight = 'none';

  leave = (element: HTMLElement) => {
    element.style.maxHeight = getComputedStyle(element).height;
    setTimeout(() => element.style.maxHeight = '0');
  };
}
</script>

<style lang="scss" scoped>
.expand {
  &-enter, &-leave-to {
    max-height: 0;
    transform: scale(1, 0);
    transform-origin: top left;
  }

  &-enter-active, &-leave-active {
    transition: max-height .25s ease, transform .25s ease;
    overflow: hidden;
  }
}
</style>
