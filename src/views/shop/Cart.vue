<template>
  <div
    class="mask"
    v-if="showCart && calculations.total > 0"
    @click="handleCartShowChange"
  ></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all">
          <span
            class="product__header__checked iconfont"
            :class="{ isChecked: calculations.allChecked }"
            @click="() => handleAllChecked(shopId, calculations.allChecked)"
            >&#xe611;</span
          >
          全选
        </div>
        <div class="product__header__clear">
          <span
            class="product__header__clear__btn"
            @click="() => clearCartProducts(shopId)"
            >清空购物车</span
          >
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
          @click="handleCartShowChange"
        />
        <div class="check__icon__tag">{{ calculations.count }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price"
          >&yen; {{ calculations.total }}</span
        >
      </div>
      <div class="check__btn" v-show="calculations.total > 0">
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }"
          >去结算</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useCommonCartEffect } from "../../effects/cartEffects";

// 获取购物车信息逻辑
const useCartEffect = () => {
  const store = useStore();
  const route = useRoute();
  const shopId = route.params.id;

  const changeCartItemChecked = (shopId, productId) => {
    store.commit("changeCartItemChecked", { shopId, productId });
  };

  const handleAllChecked = (shopId, allChecked) => {
    store.commit("handleAllChecked", { shopId, allChecked });
  };

  const clearCartProducts = shopId => {
    store.commit("clearCartProducts", { shopId });
  };

  const { productList, calculations, changeCartItemInfo } = useCommonCartEffect(
    shopId
  );
  return {
    shopId,
    calculations,
    productList,
    changeCartItemInfo,
    changeCartItemChecked,
    clearCartProducts,
    handleAllChecked
  };
};

// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false);
  const handleCartShowChange = () => {
    showCart.value = !showCart.value;
  };
  return { showCart, handleCartShowChange };
};

export default {
  name: "Cart",
  setup() {
    const { showCart, handleCartShowChange } = toggleCartEffect();
    const {
      shopId,
      calculations,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,
      clearCartProducts,
      handleAllChecked
    } = useCartEffect();

    return {
      showCart,
      handleCartShowChange,
      shopId,
      calculations,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,
      clearCartProducts,
      handleAllChecked
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/mixins.scss";
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.cart {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.5rem;
  line-height: 0.5rem;
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
  border-bottom: 1px solid #f1f1f1;
  &__header {
    display: flex;
    line-height: 0.5rem;
    border-bottom: 1px solid #f1f1f1;
    font-size: 0.14rem;
    color: #333;
    &__all {
      width: 0.64rem;
      margin-left: 0.16rem;
    }
    &__checked {
      display: inline-block;
      color: #f1f1f1;
      font-size: 0.2rem;
      margin-right: 0.08rem;
      transform: translateY(2.5px);
    }
    .isChecked {
      color: #0091ff;
    }
    &__clear {
      flex: 1;
      text-align: right;
      margin-right: 0.16rem;
      &__btn {
        display: inline-block;
        margin: 1px 0;
      }
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
  height: 0.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #fff;
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
    box-sizing: border-box;
    width: 0.98rem;
    height: 0.5rem;
    text-align: center;
    background: #4fb0f9;
    font-size: 0.14rem;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
