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
        <input
          type="password"
          placeholder="请输入密码"
          v-model="password"
          autocomplete="new-password"
        />
      </div>
      <div class="input__container">
        <input
          type="password"
          placeholder="确认密码"
          v-model="confirmPassword"
        />
      </div>
    </div>
    <div class="button">
      <div class="button__register" @click="handleRegister">
        注册
      </div>
      <div class="button__other">
        <span @click="handleLoginClick">已有账号去登陆</span>
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

const useRegisterEffect = showToast => {
  const router = useRouter();
  const data = reactive({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const { username, password, confirmPassword } = toRefs(data);
  const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
      showToast("请重新确认密码");
    } else {
      try {
        const result = await post("/api/user/register", {
          username: username.value,
          password: password.value
        });
        console.log(result);
        if (result?.errno === 0) {
          router.push({ name: "Login" });
        } else {
          showToast("注册失败");
        }
      } catch (e) {
        showToast("请求失败");
      }
    }
  };

  return { username, password, confirmPassword, handleRegister };
};

export default {
  name: "Login",
  components: { Toast },
  setup() {
    const router = useRouter();

    const { toastData, showToast } = useToastEffect();
    const {
      username,
      password,
      confirmPassword,
      handleRegister
    } = useRegisterEffect(showToast);

    const handleLoginClick = () => {
      router.push({ name: "Login" });
    };

    return {
      handleLoginClick,
      handleRegister,
      username,
      password,
      confirmPassword,
      toastData
    };
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
  padding-top: 1.4rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  &__register {
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
