<template>
  <TransitionFadeDown>
    <div
        :style="dropdownStyling"
        :class="{
				'base-dropdown--left': left,
				'base-dropdown--top': top,
				'base-dropdown--right': right
        }"
        class="base-dropdown"
        v-click-outside="onClose"
    >
      <div
          :class="{'base-dropdown__body--visible': bodyVisible}"
          :style="bodyStyling"
          class="base-dropdown__body"
          id="base-dropdown"
      >
        <button
            @click="onClose"
            class="base-dropdown__close sb-button sb-button--link sb-button--auto-width"
            v-if="showCloseButton"
        >
          <span class="icn-dp-close"/>
        </button>
        <slot name="body"/>
      </div>
      <div class="base-dropdown__actions" v-if="slots.actions">
        <slot name="actions"/>
      </div>
    </div>
  </TransitionFadeDown>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import TransitionFadeDown from '@/components/Transition/TransitionFadeDown.vue';

@Component({
  name: 'SRDropdown',
  components: { TransitionFadeDown }
})
export default class SRDropdown extends Vue {
  @Prop({ type: Boolean, default: false }) readonly bodyVisible: boolean;
  @Prop({ type: Boolean, default: true }) readonly closeOnClick: boolean;
  @Prop({ type: Boolean, default: false }) readonly top: boolean;
  @Prop({ type: Boolean, default: false }) readonly left: boolean;
  @Prop({ type: Boolean, default: false }) readonly right: boolean;
  @Prop({ type: Number, default: 500 }) readonly maxWidth: number;
  @Prop({ type: Boolean, default: false }) readonly isFullWidth: boolean;
  @Prop({ type: Number, default: 160 }) readonly minWidth: number;
  @Prop({ type: Boolean, default: false }) readonly minWidthAuto: number;
  @Prop({ type: Number, default: 300 }) readonly minHeight: number;
  @Prop({ type: Boolean, default: true }) readonly minHeightAuto: boolean;
  @Prop({ type: Number, default: 600 }) readonly maxHeight: number;
  @Prop({ type: Number, default: 15 }) readonly topIndent: number;
  @Prop({ type: Boolean, default: true }) readonly showCloseButton: boolean;
  @Prop({ type: Boolean, required: true }) readonly value: boolean;
  @Prop({ type: Number, default: 9000 }) readonly zIndex: number;
  @Prop({ type: String, default: null }) readonly closeDataCy: string;
  @Prop({ type: String, default: '#232836' }) readonly containerBackgroundColor: string;

  private isMounted: boolean = false;

  constructor() {
    super();
  }

  get dropdownStyling() {

    return {
      maxWidth: this.isFullWidth ? '100%'  : `${this.maxWidth}px`,
      minWidth: this.minWidthAuto ? 'auto' : `${this.minWidth}px`,
      'top': this.topIndent > 0 ? 'calc(100% + ' + this.topIndent + 'px)' : '100%',
      zIndex: this.zIndex,
      'background-color': this.containerBackgroundColor
    };


  }

  get bodyStyling(): Record<string, any> {
    return {
      maxHeight: `${this.maxHeight}px`,
      minHeight: this.minHeightAuto ? 'auto' : `${this.minHeight}px`,
    };
  }

  get slots(): any {
    return this.$slots;
  }

  mounted() {
    setTimeout(() => this.isMounted = true, 300);
  }

  onClose(): void {
    if (this.isMounted && this.closeOnClick) {
      this.$emit('input', !this.value);
    }
  }
}
</script>

<style lang="scss" scoped>
.base-dropdown {
  padding: 10px 0;
  position: absolute;
  box-shadow: 0 6px 12px rgba(black, .175);
  border: 1px solid rgba(black, .3);
  border-radius: 4px;
  color: white;


  &--top {
    top: -5px;
    transform: translateY(-100%);
  }

  &--left {
    right: calc(100% - 15px);
  }

  &--right {
    right: 0;
  }

  &__close {
    top: 0;
    right: 0;
    position: absolute;
    font-size: 18px;
  }
  &__body {
    max-height: 600px;
    padding: 0 20px;
    overflow-y: auto;
    overflow-x: hidden;

    &--visible {
      overflow: visible;
    }
  }

  &__actions {
    margin: 10px 0 0;
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    grid-gap: 10px;
    justify-items: end;
  }
}
</style>
