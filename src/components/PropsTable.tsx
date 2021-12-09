import { defineComponent, computed, PropType, VNode } from "vue";
import { reduce } from "lodash-es";
import { PropsToForms, mapPropsToForms } from "@/utils/propsMap";
import { TextComponentProps } from "@/utils/defaultProps";
import { Input, InputNumber, Slider, Radio, Select } from "ant-design-vue";
import { findProp } from "_@vue_compiler-core@3.2.24@@vue/compiler-core";
const mapToComponent = {
  "a-textarea": Input.TextArea,
  "a-input-number": InputNumber,
  "a-slider": Slider,
  "a-radio-group": Radio.Group,
  "a-radio-button": Radio.Button,
  "a-select": Select,
  "a-select-option": Select.Option,
} as any;

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
function capitalizeFitstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
                ["on" + capitalizeFitstLetter(eventName)]: (e: any) => {
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
    return () => (
      <div class="props-table">
        {Object.keys(finalProps.value).map((key) => {
          const value = finalProps.value[key];
          const ComponentName = mapToComponent[value.component];
          const SubComponent = value.subComponent
            ? mapToComponent[value.subComponent]
            : null;
          const props = {
            [value.valueProps]: value.value,
            ...value.extraProps,
            ...value.events,
          };
          return (
            <div key={key} class="prop-item">
              {value.text && <span class="label">{value.text}</span>}
              <div class="prop-component">
                <ComponentName {...props}>
                  {value.options &&
                    value.options.map((option) => {
                      return (
                        <SubComponent value={option.value}>
                          {option.text}
                        </SubComponent>
                      );
                    })}
                </ComponentName>
              </div>
            </div>
          );
        })}
      </div>
    );
  },
});
