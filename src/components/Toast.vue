<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive } from "@vue/reactivity";

export default {
  name: "Toast",
  props: ["message"]
};

// 管理toast相关的属性和方法
export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMsg: ""
  });
  const showToast = msg => {
    toastData.showToast = true;
    toastData.toastMsg = msg;
    setTimeout(() => {
      toastData.showToast = false;
      toastData.toastMsg = "";
    }, 2000);
  };
  return { toastData, showToast };
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
  padding: 0.14rem;
  border-radius: 0.05rem;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
}
</style>
