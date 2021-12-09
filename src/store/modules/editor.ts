import { Module } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { GlobalDataProps } from "@/store";
import { TextComponentProps } from "@/utils/defaultProps";

// 中间编辑器渲染的数据
interface ComponentData {
  // 元素属性
  props: { [key: string]: any };
  // 元素的id uuidv4 生成
  id: string;
  // 业务组件的库名 ps l-text、 l-img
  name: string;
}

// 编辑属性
interface EditorProps {
  // 供中间编辑器渲染的数据
  components: ComponentData[];
  // 当前编辑的元素 uuidv4
  currentElement: string;
}

// 测试数据
const testComponents: ComponentData[] = [
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello",
      fontSize: "10px",
      color: "red",
      lineHeight: "1",
      textAlign: "left",
      fontFamily: "",
    },
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello1",
      fontSize: "20px",
      fontWeight: "bold",
      lineHeight: "2",
      textAlign: "left",
      fontFamily: "",
    },
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello2",
      fontSize: "30px",
      actionType: "url",
      // url: "https://www.baidu.com",
      textAlign: "left",
      fontFamily: "",
    },
  },
];

export { testComponents, EditorProps, ComponentData };

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: "",
  },
  mutations: {
    // 添加元素
    addComponent(state, props: Partial<TextComponentProps>) {
      const newComponent = {
        id: uuidv4(),
        name: "l-text",
        props,
      };
      state.components.push(newComponent);
    },
    // 删除元素
    deleteComponent(state, id: string) {
      state.components = state.components.filter(
        (component) => component.id !== id
      );
    },

    // 选中当前项
    setActive(state, id: string) {
      state.currentElement = id;
    },
    // 更新组件
    updateComponent(state, { key, value }) {
      state.components.find((component) => {
        if (component.id === state.currentElement) {
          component.props[key] = value;
        }
      });
    },
  },
  getters: {
    // 获取当前元素
    getCurrentElement(state) {
      return state.components.find(
        (component) => component.id == state.currentElement
      );
    },
  },
};

export default editor;
