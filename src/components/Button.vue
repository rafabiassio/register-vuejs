<template>
  <div>
    <md-button
      v-if="classType === 'fab'"
      :class="getStyleClass"
      @click="onClick"
      :disabled="disabled"
    >
      <md-icon>{{ icon }}</md-icon>
    </md-button>
    <md-button v-else-if="classType.includes('icon')" :class="getStyleClass" @click="onClick" :disabled="disabled">
      <md-icon>{{ icon }}</md-icon>
    </md-button>
    <md-button v-else :class="getStyleClass" @click="onClick" :disabled="disabled">
      {{ label }}
    </md-button>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    disabled: Boolean,
    classType: String,
    icon: String
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
        case "icon-primary":
          return "md-raised md-primary";
        case "icon-accent":
          return "md-raised md-accent";
        case "icon-flat":
          return "md-icon-button"
        default:
          return "md-raised";
      }
    },
  },
  methods: {
    onClick(value) {
      this.$emit("handleClick", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.md-fab {
  position: absolute;
  bottom: 1.5rem;
  right: 2rem;
  transform: scale(1.25);
}
</style>
