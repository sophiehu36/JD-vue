<template>
  <div class="docker">
    <div
      v-for="(item, index) in dockerList"
      class="docker__item"
      :class="{ 'docker__item--active': index === currentIndex }"
      :key="index"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title ">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Docker",
  props: ["currentIndex"],
  setup() {
    const dockerList = [
      { icon: "&#xe600;", text: "首页", to: { name: "Home" } },
      { icon: "&#xe603;", text: "购物车", to: { name: "Home" } },
      { icon: "&#xe6e1;", text: "订单", to: { name: "OrderList" } },
      { icon: "&#xe63c;", text: "我的", to: { name: "Home" } }
    ];
    return { dockerList };
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.docker {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  color: $content-fontColor;
  &__item {
    display: inline-block;
    text-align: center;
    a {
      color: $content-fontColor;
      text-decoration: none;
    }
    &--active {
      a {
        color: #1fa4fc;
      }
    }
    .iconfont {
      font-size: 0.18rem;
      margin: 0.07rem 0 0.02rem 0;
    }
  }
  &__title {
    font-size: 0.2rem;
    /*浏览器能显示的最小字体是12px，可以用scale来缩放到10px*/
    transform: scale(0.5);
    transform-origin: center top;
  }
}
</style>
