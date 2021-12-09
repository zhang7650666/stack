<template>
  <component :is="tag" :style="styleProps" class="l-text-component"
    >tet</component
  >
</template>

<script lang="ts" setup>
import {
  transformToComponentProps,
  textDefaultProps,
  textStylePropNames,
} from "@/utils/defaultProps";

const defaultProps = transformToComponentProps(textDefaultProps);
import { defineProps, computed } from "vue";
import { pick } from "lodash-es";

const props = defineProps({
  tag: {
    type: String,
    default: "div",
  },
  ...defaultProps,
});
console.log("props", props);
const styleProps = computed(() => pick(props, textStylePropNames));
</script>
<style scoped>
h2 .l-text-component {
  margin-bottom: 0px;
}
p .l-text-component {
  margin-bottom: 0px;
}
button.l-text-component {
  padding: 5px 10px;
  cursor: pointer;
}
.l-text-component {
  position: relative !important;
}
</style>
