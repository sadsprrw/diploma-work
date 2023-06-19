<template>
  <div class="form-group" :class="{'rs-demo-base': presentation}">
    <label :for="id || uniqueId" v-if="label">{{ label }}</label>
    <div
        :class="inputClasses"
        class="rs-input-box rs-input-box-bordered rs-input-box-base rs-input-box-tall"
        :style="additionalInputStyle"
    >
      <span :class="icon" class="rs-input-box_prefix-icon" :style="additionalIconStyle" v-if="icon"></span>
      <input
          :disabled="disabled"
          :id="id || uniqueId"
          :placeholder="placeholder || label"
          :value="value"
          :type="type"
          :min="min"
          :max="max"
          :step="step"
          @input="onInput"
          @change="onChange"
          @blur="onBlur"
          class="rs-input-box_input"
          :class="{'rs-demo-base': presentation}"
          :style="additionalInputStyle"
          :autoComplete="inputAutoComplete"
      />
    </div>
    <TransitionExpand>
      <div class="rs-input-box__error" v-if="errorMessage">{{errorMessage}}</div>
    </TransitionExpand>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { TypeUtil } from '@/common/typeUtil';
import TransitionExpand from '@/components/Transition/TransitionExpand.vue';

@Component({
  name: 'SRInput',
  components: { TransitionExpand }
})
export default class SRInput extends Vue {
  @Prop({ type: Boolean, default: false }) readonly disabled: boolean;
  @Prop({ type: String }) readonly errorMessage: string;
  @Prop({ type: String }) readonly icon: string;
  @Prop() readonly id: any;
  @Prop({ type: String }) readonly label: string;
  @Prop({ type: String }) readonly placeholder: string;
  @Prop({ required: true }) value: any;
  @Prop({ type: String, default: 'text' }) readonly type: string;
  @Prop({ type: Boolean, default: false, required: false }) readonly isFloat: boolean;
  @Prop({ type: Number, required: false }) readonly min: number;
  @Prop({ type: Number, required: false }) readonly max: number;
  @Prop({ type: Number, required: false }) readonly step: number;
  @Prop({ type: Boolean, default: false }) readonly presentation: boolean;
  @Prop({ type: Boolean, default: false }) readonly small: boolean;
  @Prop({ type: Boolean, default: false }) readonly greyBackground: boolean;
  @Prop({ type: Boolean, default: false }) readonly isAutoComplete: boolean;
  @Prop({ type: Boolean }) readonly highlighted: boolean;
  @Prop({ type: Number, default: 0 }) readonly timeout: number;
  @Prop({ required: false }) readonly inputStyle: Object;
  @Prop({ required: false }) readonly iconStyle: Object;

  private timeoutHandle: number;

  constructor() {
    super();
  }

  get uniqueId(): string {
    return TypeUtil.genUUID();
  }

  get inputClasses(): object {
    return {
      'rs-input-box--disabled': this.disabled,
      'rs-input-box--error': this.errorMessage,
      'gray-background': this.greyBackground,
      'rs-highlight-element': this.highlighted
    };
  }

  get additionalInputStyle(): object {
    if (this.small) {
      return {
        'height': '18px',
        'min-height': '18px',
        'font-size': '12px',
      };
    }

    return this.inputStyle;
  }

  get additionalIconStyle() {
    return !this.iconStyle ? {} : this.iconStyle;
  }

  get inputAutoComplete(): string {
    return this.isAutoComplete ? 'on' : 'off';
  }

  onInput(event: Event) {
    const data = this.type === 'number'
        ? (this.isFloat ? parseFloat((event.target as HTMLInputElement).value) : parseInt((event.target as HTMLInputElement).value))
        : (event.target as HTMLInputElement).value;
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => this.$emit('input', data), this.timeout);
  }

  onChange(event: Event) {
    const data = this.type === 'number'
        ? (this.isFloat ? parseFloat((event.target as HTMLInputElement).value) : parseInt((event.target as HTMLInputElement).value))
        : (event.target as HTMLInputElement).value;
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => this.$emit('change', data), this.timeout);
  }

  onBlur(event: Event) {
    this.$emit('blur', event);
  }
}
</script>

<style lang="scss" scoped>
.rs-input-box_input[type=number]::-webkit-inner-spin-button,
.rs-input-box_input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

.gray-background {
  background-color: #232836 !important;
}


.rs-input-box__input {
  &:active, :focus {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
