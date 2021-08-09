<template>
  <div class="wrapper">
    <div class="user">
      <img class="user__avatar" src="../../assets/imgs/user.png" alt="" />
    </div>
    <div class="input">
      <div class="input__container">
        <input type="text" placeholder="请输入用户名" />
      </div>
      <div class="input__container">
        <input type="password" placeholder="请输入密码"/>
      </div>
      <div class="input__container">
        <input type="password" placeholder="确认密码" />
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
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const handleLoginClick = () => {
      router.push({ name: "Login" });
    };
    const handleRegister = () => {
      console.log("click");
      localStorage.isLogin = true;
      router.push({ name: "Home" });
    };
    return { handleLoginClick, handleRegister };
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
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 6px;
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
