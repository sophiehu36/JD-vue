<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe601;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe602;</span>
        <input
          class="search__content__input"
          type="text"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <ShopInfo :item="item" v-show="item.imgUrl" :hide-border="true" />
    <Content />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "@/utils/request";
import ShopInfo from "@/components/ShopInfo.vue";
import Content from "./Content.vue";
import Cart from "./Cart.vue";

const useShopInfoEffect = () => {
  const route = useRoute();

  const data = reactive({ item: {} });
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    console.log(result);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };

  const { item } = toRefs(data);

  return { item, getItemData };
};

export default {
  name: "Shop",
  components: { ShopInfo, Content, Cart },
  setup() {
    const router = useRouter();

    const { item, getItemData } = useShopInfoEffect();
    getItemData();
    const handleBackClick = () => {
      router.back();
    };
    return { item, getItemData, handleBackClick };
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
.wrapper {
  padding-top: 0.16rem;
  .shop {
    margin-left: 0.18rem;
    margin-top: 0.04rem;
  }
}

.search {
  display: flex;
  align-items: center;
  padding-left: 0.18rem;
  line-height: 0.32rem;
  &__back {
    font-size: 0.2rem;
    color: #b6b6b6;
    margin-right: 0.08rem;
    transform: translateX(-4px);
  }
  &__content {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 3.1rem;
    padding: 0 0.16rem;
    height: 0.32rem;
    background: #f5f5f5;
    border-radius: 16px;
    &__icon {
      color: #b6b6b6;
      margin-right: 0.12rem;
    }
    &__input {
      background: transparent;
      line-height: 0.32rem;
      width: 100%;
      padding: 0;
      border: none;
      &:focus-visible {
        outline: none;
      }
      &::placeholder {
        font-size: 14px;
        color: $content-fontColor;
        line-height: 16px;
      }
    }
  }
}
</style>
