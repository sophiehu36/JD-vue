<template>
  <div class="top">
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">
        &#xe601;
      </div>
      确认订单
    </div>
    <div class="top__receiver">
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">
        北京理工大学国防科技园2号楼10层
      </div>
      <div class="top__receiver__info">
        <span class="top__receiver__name">瑶妹（先生）</span>
        <span class="top__receiver__phone">18911024266</span>
      </div>
      <div class="iconfont top__receiver__enter">&#xe601;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "TopArea",
  setup() {
    const router = useRouter();
    const handleBackClick = () => {
      router.back();
    };
    return {
      handleBackClick
    };
  }
};
</script>

<style lang="scss" scoped>
.top {
  height: 1.96rem;
  position: relative;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;

  &__header {
    position: relative;
    padding-top: 0.26rem;
    line-height: 0.24rem;
    color: white;
    font-size: 0.16rem;
    text-align: center;
    &__back {
      position: absolute;
      left: 0.19rem;
    }
  }
  &__receiver {
    position: absolute;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    height: 1.11rem;
    background: white;
    border-radius: 0.04rem;
    padding-left: 0.16rem;
    &__title {
      font-size: 0.16rem;
      line-height: 0.22rem;
      margin-top: 0.16rem;
      color: #333;
    }
    &__address {
      margin: 0.14rem 0 0.06rem 0;
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #333;
    }
    &__info {
      font-size: 0.12rem;
      line-height: 0.17rem;
      color: #666666;
    }
    &__name {
      margin-right: 0.06rem;
    }
    &__enter {
      position: absolute;
      right: 0.16rem;
      top: 0.48rem;
      color: #666666;
      transform: rotate(180deg);
    }
  }
}
</style>
