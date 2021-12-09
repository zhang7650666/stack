<template>
  <div class="props-table">
    <!-- <div>{{ finalProps }}</div> -->
    <div v-for="(value, key) in finalProps" :key="key" class="prop-item">
      <span class="label" v-if="value.text">{{ value?.text }}</span>
      <div class="prop-component">
        <component
          v-if="value"
          :is="value.component"
          v-bind="value.extraProps"
          :[value.valueProps]="value.value"
          v-on="value.events"
        >
          <template v-if="value.options">
            <component
              :is="value.subComponent"
              v-for="(option, k) in value.options"
              :key="k"
              :value="option.value"
              >{{ option.text }}</component
            >
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, VNode } from "vue";
import { reduce } from "lodash-es";
import { PropsToForms, mapPropsToForms } from "@/utils/propsMap";
import { TextComponentProps } from "@/utils/defaultProps";
interface FormProps {
  component: string;
  subComponent?: string;
  extraProps?: { [key: string]: any };
  value: string;
  text?: string;
  options?: { text: string | VNode; value: any }[];
  valueProps: string;
  eventName: string;
  events: { [key: string]: (v: string) => void };
}
export default defineComponent({
  props: {
    props: {
      type: Object as PropType<TextComponentProps>,
      require: true,
    },
  },
  emits: ["change"],
  setup(props, context) {
    const finalProps = computed(() => {
      return reduce(
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps;
          const item = mapPropsToForms[newKey];
          if (item) {
            const {
              eventName = "change",
              valueProps = "value",
              initalTransform,
              afterTransform,
            } = item;
            const newItem = {
              ...item,
              value: initalTransform ? initalTransform(value) : value,
              eventName,
              valueProps,
              events: {
                [eventName]: (e: any) => {
                  context.emit("change", {
                    key,
                    value: afterTransform ? afterTransform(e) : e,
                  });
                },
              },
            };
            result[newKey] = newItem;
          }
          return result;
        },
        {} as { [key: string]: FormProps }
      );
    });

    return {
      finalProps,
    };
  },
});
</script>
<style>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.hide-item {
  display: none;
}
.label {
  width: 28%;
}
.prop-item.no-text {
  display: inline-block;
  margin: 0 10px 0 0;
}
#item-fontWeight {
  margin-left: 28%;
}
.prop-component {
  width: 70%;
}
/* .component-a-slider {
  width: 80%;
} */
.component-a-select .ant-select {
  width: 150px;
}
.prop-component.component-shadow-picker,
.prop-component.component-image-processer,
.prop-component.component-background-processer {
  width: 100%;
}
#item-backgroundImage {
  width: 100%;
  cursor: pointer;
  margin-bottom: 15px;
}
#item-backgroundImage .styled-upload-component .uploader-container {
  min-height: 200px;
}
</style>
