<template>
  <div class="editor" id="editor-layout-main">
    <!-- <a-spin tip="读取中" class="editor-spinner" v-if="globalStatus.loading">
    </a-spin> -->

    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div class="sidebar-container">
          <components-list :list="defaultTemplate" @onItemClick="addItem">
          </components-list>
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <!-- <history-area></history-area> -->
          <div class="preview-list" id="canvas-area">
            <edit-wrapper
              v-for="component in components"
              :key="component.id"
              :id="component.id"
              :active="component.id === currentElement?.id"
              @setActive="setActive"
            >
              <component :is="component.name" v-bind="component.props">
              </component>
            </edit-wrapper>
          </div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider
        width="300"
        style="background: #fff"
        class="settings-panel"
      >
        <props-table
          v-if="currentElement && currentElement.props"
          :props="currentElement.props"
          @change="handlerChange"
        ></props-table>
        <pre>{{ currentElement?.props }}</pre>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
// 第三方方法
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
// 数据
import { GlobalDataProps } from "@/store";
import { defaultTemplate } from "@/utils/defaultTemplateData";
import { ComponentData } from "@/store/modules/editor";

// 组件
import LText from "@/components/LText.vue";
import ComponentsList from "@/components/ComponentsList.vue";
import EditWrapper from "@/components/EditWarpper.vue";
import PropsTable from "@/components/PropsTable.vue";

export default defineComponent({
  components: {
    LText,
    ComponentsList,
    EditWrapper,
    PropsTable,
  },
  setup() {
    const $store = useStore<GlobalDataProps>();
    // 获取元素列表
    const components = computed(() => $store.state.editor.components);
    // 获取当前元素
    const currentElement = computed<ComponentData | null>(
      () => $store.getters.getCurrentElement
    );

    console.log("currentElement", currentElement.value);
    // 添加一项
    const addItem = (data: ComponentData) => {
      $store.commit("addComponent", data);
    };

    // 设置选中项
    const setActive = (id: string) => {
      $store.commit("setActive", id);
    };

    // 监听子组件的变化
    const handlerChange = (e: any) => {
      $store.commit("updateComponent", e);
    };
    return {
      components,
      defaultTemplate,
      currentElement,
      addItem,
      setActive,
      handlerChange,
    };
  },
});
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
}
.header .logo-img {
  margin-right: 20px;
  height: 40px;
}
.page-title {
  display: flex;
}
.header h4 {
  color: #ffffff;
}
.editor-spinner {
  position: fixed;
  right: 50%;
  top: 10px;
}
.preview-container {
  padding: 24px;
  margin: 0;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
.preview-list.active {
  border: 1px solid #1890ff;
}
.preview-list.canvas-fix .l-text-component,
.preview-list.canvas-fix .l-image-component,
.preview-list.canvas-fix .l-shape-component {
  box-shadow: none !important;
}
.preview-list.canvas-fix {
  position: absolute;
  max-height: none;
}
.sidebar-container {
  padding: 20px;
}
.body-container {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.page-settings {
  padding: 16px;
}
.settings-panel .ant-tabs-top-content {
  max-height: calc(100vh - 68px - 56px);
  overflow-y: auto;
}
.final-preview {
  position: absolute;
  width: calc(100% - 400px);
  height: 100%;
  background: transparent;
  top: 0;
  left: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
}
.final-preview-inner {
  width: 430px;
  height: 870px;
  padding: 60px 28px;
  position: relative;
  background: url("~@/assets/phone-back.png") no-repeat;
  background-size: cover;
}
.final-preview-inner .preview-title {
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-weight: bold;
}
.iframe-container {
  width: 100%;
  height: 706px;
  overflow-y: auto;
  overflow-x: hidden;
}
.iframe-placeholder {
  background: url("~@/assets/loading.svg") 50% 50% no-repeat;
  background-size: 50px;
}
.settings-panel .ant-list-bordered {
  border-radius: 0;
}
.settings-panel .ant-collapse {
  border-radius: 0;
}
.ant-collapse-header,
.ant-collapse-item {
  border-radius: 0 !important;
}
.settings-panel .ant-tabs-tab {
  border-radius: 0 !important;
}
</style>
