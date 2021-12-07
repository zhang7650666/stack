<template>
  <component
    :is="tag"
    :style="styleProps"
    class="l-text-component"
    @click="handlerClick"
    >{{ text }}</component
  >
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue";
import {
  transformToComponentProps,
  textDefaultProps,
  textStylePropNames,
} from "@/utils/defaultProps";
import { useComponentCommon } from "@/hooks/useComponentCommon";
const defaultProps = transformToComponentProps(textDefaultProps);
export default defineComponent({
  props: {
    tag: {
      type: String,
      default: "div",
    },
    ...defaultProps,
  },
  setup(props) {
    const { styleProps, handlerClick } = useComponentCommon(
      props,
      textStylePropNames
    );
    return {
      styleProps,
      handlerClick,
      ...toRefs(props),
    };
  },
});
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
