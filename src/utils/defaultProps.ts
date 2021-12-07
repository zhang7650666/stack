// 通用属性
import { mapValues, without } from "lodash-es";

// 所有元素的通用属性
interface CommonComponentProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: string;
  // position and x,y
  position: string;
  left: string;
  top: string;
  right: string;
}
// 所有元素的通用属性
const commonDefaultProps = {
  // actions
  actionType: "",
  url: "",
  // size
  height: "",
  width: "",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",
  // border type
  borderStyle: "none",
  borderColor: "#000",
  borderWidth: "0",
  borderRadius: "0",
  // shadow and opacity
  boxShadow: "0 0 0 #000000",
  opacity: "1",
  // position and x,y
  position: "absolute",
  left: "0",
  top: "0",
  right: "0",
};

interface TextComponentProps extends CommonComponentProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}
// 文本特有属性
const textDefaultProps: TextComponentProps = {
  // basic props - font styles
  text: "正文内容",
  fontSize: "14px",
  fontFamily: "",
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  lineHeight: "1",
  textAlign: "center",
  color: "#000000",
  backgroundColor: "",
  ...commonDefaultProps,
  //   width: "318px",
};

// 为每一props属性动态设置类型
const transformToComponentProps = (props: TextComponentProps) => {
  return mapValues(props, (item) => {
    return {
      type: item.constructor as StringConstructor,
      default: item,
    };
  });
};

// const transformToComponentProps = (props: { [key: string]: any }) => {
//   return mapValues(props, (item) => {
//     return {
//       type: item.constructor,
//       default: item,
//     };
//   }) as { [key: string]: any };
// };

// 剔除非样式的属性
const textStylePropNames = without(
  Object.keys(textDefaultProps),
  "actionType",
  "url",
  "text"
);
export {
  commonDefaultProps,
  textDefaultProps,
  textStylePropNames,
  TextComponentProps,
  CommonComponentProps,
  transformToComponentProps,
};
