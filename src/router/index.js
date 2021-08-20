import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    // 异步路由，只有访问home页面时才加载对应资源
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/home/Home.vue")
  },
  {
    path: "/shop/:id",
    name: "Shop",
    component: () =>
      import(/* webpackChunkName: "shop" */ "@/views/shop/Shop.vue")
  },
  {
    path: "/cartList",
    name: "CartList",
    // 异步路由，只有访问home页面时才加载对应资源
    component: () =>
      import(/* webpackChunkName: "cartList" */ "@/views/cartList/CartList.vue")
  },
  {
    path: "/orderConfirmation/:id",
    name: "OrderConfirmation",
    // 异步路由，只有访问home页面时才加载对应资源
    component: () =>
      import(
        /* webpackChunkName: "cartList" */ "@/views/orderConfirmation/OrderConfirmation.vue"
      )
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/Login.vue"),
    // 访问Login页面前执行
    beforeEnter: (to, from, next) => {
      const isLogin = localStorage.isLogin;
      isLogin ? next({ name: "Home" }) : next();
    }
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(
        /* webpackChunkName: "register" */ "@/views/register/Register.vue"
      ),
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
