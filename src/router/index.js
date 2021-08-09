import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/home/Home.vue";
import Login from "@/views/login/Login.vue";
import Register from "@/views/register/Register.vue";

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/",
    redirect: to => {
      if (localStorage.isLogin) {
        return "/home";
      } else {
        return "/login";
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    // 访问Login页面前执行
    beforeEnter: (to, from, next) => {
      const isLogin = localStorage.isLogin;
      isLogin ? next({ name: "Home" }) : next();
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    // 访问Login页面前执行
    beforeEnter: (to, from, next) => {
      const isLogin = localStorage.isLogin;
      isLogin ? next({ name: "Home" }) : next();
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// beforeEach，路由切换前执行
// 验证是否登录，如果未登录就会跳转到Login
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.isLogin;
  const { name } = to;
  const isLoginOrRegister = name === "Login" || name === "Register";
  // 如果打开的页面就是Login或Register，就不再跳转
  // 避免死循环
  isLogin || isLoginOrRegister ? next() : next({ name: "Login" });
});

export default router;
