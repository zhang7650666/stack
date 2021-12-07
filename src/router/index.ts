import { createRouter, RouteRecordRaw, createWebHistory } from "vue-router";
// import axios from 'axios'
// import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: () =>
      import(/* webpackChunkName: "Index" */ "@/views/Index.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "Home" */ "@/views/Home.vue"),
        meta: { title: "欢迎来到慕课乐高" },
      },
      {
        path: "mywork",
        name: "MyWork",
        component: () =>
          import(/* webpackChunkName: "mywork" */ "@/views/MyWork.vue"),
        meta: { requiredLogin: true, title: "我的设计列表" },
      },
      {
        path: "/template/:id",
        name: "TemplateDetail",
        component: () =>
          import(
            /* webpackChunkName: "TemplateDetail" */ "@/views/TemplateDetail.vue"
          ),
        meta: { title: "模版详情" },
      },
      {
        path: "setting",
        name: "Setting",
        component: () =>
          import(/* webpackChunkName: "Setting" */ "@/views/Setting.vue"),
        meta: { requiredLogin: true, title: "我的信息" },
      },
    ],
  },
  {
    path: "/editor/:id",
    name: "Editor",
    component: () =>
      import(/* webpackChunkName: "editor" */ "@/views/Editor.vue"),
    meta: { requiredLogin: true, title: "编辑我的设计" },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login.vue"),
    meta: { redirectAlreadyLogin: true, title: "登录到慕课乐高" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // scrollBehavior: (to, from, savedPosition) => {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return Promise.resolve({ left: 0, top: 0 });
  //   }
  // },
});

export default router;
