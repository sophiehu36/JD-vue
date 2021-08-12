<template>
  <div class="cart">
    <div class="product">
      <div class="product__header">
        <div class="product__header__all">
          <span class="product__header__checked iconfont">&#xe611;</span>
          全选
        </div>
        <div
          class="product__header__clear"
          @click="() => clearCartProducts(shopId)"
        >
          清空购物车
        </div>
      </div>
      <template v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count">
          <div
            class="product__item__checked iconfont"
            :class="{ isChecked: item.check }"
            @click="() => changeCartItemChecked(shopId, item._id)"
          >
            &#xe611;
          </div>
          <img class="product__item__img" :src="item.imgUrl" alt="" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin"
                >&yen;{{ item.oldPrice }}</span
              >
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus"
              v-show="item.count"
              @click="() => changeCartItemInfo(shopId, item._id, item, -1)"
              >-</span
            >
            {{ item.count || "" }}
            <span
              class="product__number__plus"
              @click="() => changeCartItemInfo(shopId, item._id, item, 1)"
              >+</span
            >
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          class="check__icon__img"
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt=""
        />
        <div class="check__icon__tag">{{ count }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{ total }}</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "./commonCartEffect";

// 获取购物车信息逻辑
const useCartEffect = () => {
  const store = useStore();
  const route = useRoute();
  const shopId = route.params.id;
  const cartList = store.state.cartList;
  const count = computed(() => {
    const productList = cartList[shopId];
    let count = 0;
    if (productList) {
      for (const i in productList) {
        const product = productList[i];
        count += product.count;
      }
    }
    return count;
  });
  const total = computed(() => {
    const productList = cartList[shopId];
    let total = 0;
    if (productList) {
      for (const i in productList) {
        const product = productList[i];
        if (product.check) {
          total += product.count * product.price;
        }
      }
    }
    return total.toFixed(2);
  });

  const productList = computed(() => {
    const productList = cartList[shopId] || [];
    return productList;
  });

  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", { shopId, productId });
  };

  const clearCartProducts = shopId => {
    store.commit("clearCartProducts", { shopId });
  };

  const { changeCartItemInfo } = useCommonCartEffect();
  return {
    shopId,
    count,
    total,
    productList,
    changeCartItemInfo,
    changeCartItemChecked,
    clearCartProducts
  };
};

export default {
  name: "Cart",
  setup() {
    const {
      shopId,
      count,
      total,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,
      clearCartProducts
    } = useCartEffect();

    return {
      shopId,
      count,
      total,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,
      clearCartProducts
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/mixins.scss";
.cart {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.49rem;
  line-height: 0.49rem;
  box-shadow: 0 -1px 1px 0 #f1f1f1;
}

.product {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #fff;
  &__header {
    display: flex;
    line-height: 0.52rem;
    border-bottom: 1px solid #f1f1f1;
    font-size: 0.14rem;
    color: #333;
    &__all {
      width: 0.64rem;
      margin-left: 0.16rem;
    }
    &__checked {
      color: #f1f1f1;
      font-size: 0.2rem;
      margin-right: 0.08rem;
    }
    .isChecked {
      color: #0091ff;
    }
    &__clear {
      flex: 1;
      text-align: right;
      margin-right: 0.16rem;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    &__checked {
      color: #f1f1f1;
      font-size: 0.2rem;
      margin-right: 0.16rem;
    }
    .isChecked {
      color: #0091ff;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 0.46rem;
      height: 0.46rem;
      margin-right: 0.16rem;
    }
    &__title {
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333;
      margin: 0;
      @include ellipsis;
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

.check {
  height: 0.49rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  &__icon {
    position: relative;
    width: 0.84rem;
    &__img {
      display: block;
      margin: 0.12rem auto;
      width: 0.28rem;
      height: 0.26rem;
    }
    &__tag {
      position: absolute;
      top: 0.04rem;
      left: 0.5rem;
      min-width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background: #e93b3b;
      color: #fff;
      border-radius: 0.1rem;
      font-size: 0.12rem;
      text-align: center;
      transform: scale(50%);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    height: 0.5rem;
    color: #333;
    &__price {
      height: 0.49rem;
      box-sizing: border-box;
      font-size: 18px;
      color: #e93b3b;
    }
  }
  &__btn {
    width: 0.98rem;
    height: 0.51rem;
    text-align: center;
    background: #4fb0f9;
    color: #fff;
    font-size: 0.14rem;
  }
}
</style>
