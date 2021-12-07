import { createStore } from "vuex";
import user, { UserProps } from "@/store/modules/user";
import editor, { EditorProps } from "@/store/modules/editor";
import works from "@/store/modules/works";

// 全局数据
interface GlobalDataProps {
  user: UserProps;
  // templates: TemplatesProps;
  editor: EditorProps;
}

export { GlobalDataProps };

export default createStore({
  strict: true,
  // state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    editor,
    works,
  },
});

// if(module.hot){
//     module.hot.accept(['./mutations', './modules/a'], () => {
//         const newMutations = require('./mutations').default;
//         const newModuleA = require('./modules/a').default;
//         store.hotUpdate({
//             mutations: newMutations,
//             modules: {
//                 a: newModuleA
//             }
//         })
//     })
// }
