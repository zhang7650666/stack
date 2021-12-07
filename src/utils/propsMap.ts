import { TextComponentProps } from "@/utils/defaultProps";
interface PropsToForm {
  component: string;
  subComponent?: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string; value: any }[];
  initalTransform?: (v: any) => any;
  valueProps?: string;
  eventName?: string;
}

type PropsToForms = {
  [p in keyof TextComponentProps]?: PropsToForm;
};

const mapPropsToForms: PropsToForms = {
  text: {
    component: "a-textarea",
    extraProps: {
      row: 3,
    },
    text: "文本",
  },
  fontSize: {
    component: "a-input-number",
    text: "字号",
    initalTransform: (v: string) => parseFloat(v),
  },
  lineHeight: {
    component: "a-slider",
    extraProps: {
      min: 0,
      max: 3,
      step: 0.1,
    },
    text: "行高",
    initalTransform: (v: string) => parseFloat(v),
  },
  textAlign: {
    component: "a-radio-group",
    subComponent: "a-radio-button",
    text: "对齐",
    options: [
      {
        text: "左",
        value: "left",
      },
      {
        text: "中",
        value: "center",
      },
      {
        text: "右",
        value: "right",
      },
    ],
  },
  fontFamily: {
    component: "a-select",
    subComponent: "a-select-option",
    text: "字体",
    options: [
      //   { value: "", text: "无" },
      { text: "宋体", value: '"SimSun","STSong"' },
      { text: "黑体", value: '"SimHei","STHeiti"' },
      { text: "楷体", value: '"KaiTi","STKaiti"' },
      { text: "仿宋", value: '"FangSong","STFangsong"' },
      { text: "Arial", value: '"Arial", sans-serif' },
      { text: "Arial Black", value: '"Arial Black", sans-serif' },
      { text: "Comic Sans MS", value: '"Comic Sans MS"' },
      { text: "Courier New", value: '"Courier New", monospace' },
      { text: "Georgia", value: '"Georgia", serif' },
      { text: "Times New Roman", value: '"Times New Roman", serif' },
    ],
  },
};
export { PropsToForm, PropsToForms, mapPropsToForms };
