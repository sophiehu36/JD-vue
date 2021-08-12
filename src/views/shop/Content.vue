<template>
  <div class="content">
    <div class="category">
      <div
        :class="{
          category__item: true,
          'category__item--active': currentTab === item.tab
        }"
        v-for="(item, index) in categories"
        :key="index"
        @click="() => handleTabClick(item.tab)"
      >
        {{ item.name }}
      </div>
      <!-- <div class="category__item">休闲食品</div>
      <div class="category__item">时令蔬菜</div>
      <div class="category__item">肉蛋家禽</div> -->
    </div>
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl" alt="" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售{{ item.sales }}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            v-show="cartList?.[shopId]?.[item._id]?.count"
            @click="() => changeCartItemInfo(shopId, item._id, item, -1)"
            >-</span
          >
          {{ cartList?.[shopId]?.[item._id]?.count || "" }}
          <span
            class="product__number__plus"
            @click="() => changeCartItemInfo(shopId, item._id, item, 1)"
            >+</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { get } from "@/utils/request";
import { useCommonCartEffect } from "./commonCartEffect";

const categories = [
  { name: "全部商品", tab: "all" },
  { name: "秒杀", tab: "seckill" },
  {
    name: "新鲜水果",
    tab: "fruit"
  }
];

// tab相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab);
  const handleTabClick = tab => {
    console.log(tab);
    currentTab.value = tab;
  };
  return {
    currentTab,
    handleTabClick
  };
};

// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] });
  // 获取列表内容
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    });
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data;
    }
    console.log(result);
  };
  // 随依赖改变而改变
  watchEffect(() => {
    getContentData();
  });
  const { list } = toRefs(content);
  return { list };
};

export default {
  name: "Content",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    const { currentTab, handleTabClick } = useTabEffect();
    const { list } = useCurrentListEffect(currentTab, shopId);
    const { cartList, changeCartItemInfo } = useCommonCartEffect();
    return {
      list,
      cartList,
      shopId,
      currentTab,
      categories,
      handleTabClick,
      changeCartItemInfo
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/mixins.scss";

.content {
  display: flex;
  position: absolute;
  top: 1.5rem;
  bottom: 0.5rem;
  left: 0;
  right: 0;
}

.category {
  overflow-y: scroll;
  height: 100%;
  width: 0.76rem;
  background: #f5f5f5;
  &__item {
    line-height: 0.4rem;
    text-align: center;
    font-size: 0.14rem;
    color: #333;
    &--active {
      background: #fff;
    }
  }
}

.product {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex: 1;
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f1f1f1;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &__title {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333;
      margin: 0;
      @include ellipsis;
    }
    &__sales {
      margin: 0.06rem 0;
      line-height: 0.16rem;
      font-size: 0.12rem;
      color: #333;
    }
    &__price {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #e93b3b;
    }
    &__yen {
      font-size: 0.12rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      font-size: 0.12rem;
      color: #999;
      text-decoration: line-through;
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      &__minus,
      &__plus {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        line-height: 0.16rem;
        border-radius: 50%;
        font-size: 0.2rem;
        text-align: center;
      }
      &__minus {
        border: 0.01rem solid #666;
        color: #666;
        margin-right: 0.05rem;
      }
      &__plus {
        background: #0091ff;
        color: #fff;
        border: 0.01rem solid #0091ff;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>
