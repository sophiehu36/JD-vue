<template>
  <div class="wrapper">
    <div class="user">
      <img class="user__avatar" src="../../assets/imgs/user.png" alt="" />
    </div>
    <div class="input">
      <div class="input__container">
        <input type="text" placeholder="请输入用户名" v-model="username" />
      </div>
      <div class="input__container">
        <input type="password" placeholder="请输入密码" v-model="password" />
      </div>
    </div>
    <div class="button">
      <div class="button__login" @click="handleLogin">
        登陆
      </div>
      <div class="button__other">
        <span @click="handleRegisterClick">立即注册</span
        ><span class="button__other__gap">|</span><span>忘记密码</span>
      </div>
    </div>
    <Toast v-if="toastData.showToast" :message="toastData.toastMsg" />
  </div>
</template>

<script>
// 系统级别的引用放在顶部
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
// 自己写的引用放在下面
import { post } from "@/utils/request";
import Toast, { useToastEffect } from "@/components/Toast";

const useLoginEffect = showToast => {
  const router = useRouter();
  const data = reactive({
    username: "",
    password: ""
  });
  const { username, password } = toRefs(data);

  const handleLogin = async () => {
    if (username.value !== "" && password.value !== "") {
      console.log("username:", username, "password:", password);
      try {
        const result = await post("/api/user/login", {
          username: username.value,
          password: password.value
        });
        console.log(result);
        if (result?.errno === 0) {
          localStorage.isLogin = true;
          router.push({ name: "Home" });
        } else {
          showToast("登录失败");
        }
      } catch (e) {
        showToast("请求失败");
      }
    } else {
      showToast("请输入用户名和密码");
    }
  };

  return { username, password, handleLogin };
};

export default {
  name: "Login",
  components: { Toast },
  // setup职责就是告诉你，代码执行的一个流程
  setup() {
    const router = useRouter();

    const { toastData, showToast } = useToastEffect();
    const { username, password, handleLogin } = useLoginEffect(showToast);

    const handleRegisterClick = () => {
      router.push({ name: "Register" });
    };

    return { handleLogin, handleRegisterClick, username, password, toastData };
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user {
  margin-bottom: 0.4rem;
  &__avatar {
    width: 0.66rem;
    height: 0.66rem;
  }
}

.input {
  &__container {
    display: flex;
    align-items: center;
    width: 2.95rem;
    height: 0.48rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    margin-bottom: 0.16rem;
    input {
      width: 100%;
      line-height: 0.24rem;
      box-sizing: border-box;
      font-size: 0.16rem;
      padding-left: 0.16rem;
      border: none;
      background: transparent;
      &:focus-visible {
        outline: none;
      }
      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}

.button {
  margin-top: 0.16rem;
  &__login {
    width: 2.95rem;
    height: 0.48rem;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    line-height: 0.48rem;
    text-align: center;
    background: #0091ff;
    color: white;
    font-size: 0.16rem;
  }
  &__other {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.16rem;
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
    &__gap {
      margin: 0 0.12rem;
      font-size: 0.12rem;
    }
  }
}
</style>
