<template>
  <md-button :class="getStyleClass" @click="onClick" :disabled="disabled" :type="type">
    <md-icon v-if="showIcon">add</md-icon>
    {{ !showIcon && label }}
  </md-button>
</template>

<script>
export default {
  props: {
    label: String,
    disabled: Boolean,
    classType: String,
    type: String
  },
  computed: {
    getStyleClass() {
      switch (this.$props.classType) {
        case "primary":
          return "md-dense md-raised md-primary";
        case "accent":
          return "md-dense md-raised md-accent";
        case "fab":
          return "md-fab md-primary";
        default:
          return "md-raised";
      }
    },
    showIcon() {
      return this.$props.classType === "fab";
    }
  },
  methods: {
    onClick(value) {
      this.$emit("handleClick", value);
    }
  }
};
</script>
