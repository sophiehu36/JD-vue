import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/home/Home.vue";
import Login from "@/views/login/Login.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 验证是否登录，如果未登录就会跳转到Login
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin;
  // 如果打开的页面就是Login，就不再跳转
  // 避免死循环
  if (isLogin || to.name === "Login") {
    next();
  } else {
    next({ name: "Login" });
  }
  console.log(to, from);
});

export default router;
