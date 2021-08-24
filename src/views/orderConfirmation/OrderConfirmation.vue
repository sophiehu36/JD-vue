<template>
  <div class="wrapper">
    <TopArea />
    <div class="products">
      <div class="products__title">{{ shopName }}</div>
      <div class="products__list">
        <div class="product">
          <div
            v-for="item in productList"
            :key="item._id"
            class="product__item"
          >
            <img class="product__item__img" :src="item.imgUrl" alt="" />
            <div class="product__item__detail">
              <h4 class="product__item__title">{{ item.name }}</h4>
              <p class="product__item__price">
                <span class="product__item__yen">&yen;</span>{{ item.price }} x
                {{ item.count }}
                <span class="product__item__total"
                  ><span class="product__item__yen">&yen;</span
                  >{{ (item.price * item.count).toFixed(2) }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="order__price">
        实付金额<b> &yen;{{ calculations.total }}</b>
      </div>
      <div class="order__btn" @click="() => handleShowConfirmChange(true)">
        提交订单
      </div>
    </div>
    <div
      class="mask"
      v-show="showMask"
      @click.self="handleShowConfirmChange(false)"
    >
      <div class="mask__content">
        <h3 class="mask__content__title">确认要离开收银台？</h3>
        <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
        <div class="mask__content__btns">
          <div
            class="mask__content__btn mask__content__btn--cancel"
            @click="() => handleConfirmOrder(true)"
          >
            取消订单
          </div>
          <div
            class="mask__content__btn mask__content__btn--confirm"
            @click="() => handleConfirmOrder(false)"
          >
            确认支付
          </div>
        </div>
      </div>
      <Toast v-if="toastData.showToast" :message="toastData.toastMsg" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { post } from "@/utils/request";
import { useCommonCartEffect } from "../../effects/cartEffects";
import Toast, { useToastEffect } from "@/components/Toast";
import TopArea from "./TopArea.vue";

// 下单相关逻辑
const useMakeOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter();
  const store = useStore();

  const { toastData, showToast } = useToastEffect();

  const handleConfirmOrder = async boolean => {
    const products = [];
    for (const i in productList.value) {
      const product = productList.value[i];
      products.push({ id: parseInt(product._id), num: product.count });
    }
    try {
      const result = await post("/api/order", {
        addressId: 1,
        shopId: parseInt(shopId),
        shopName: shopName.value,
        isCanceled: boolean,
        products
      });
      console.log(result);
      if (result?.errno === 0) {
        store.commit("clearCartProducts", { shopId });
        router.push({ name: "OrderList" });
      }
    } catch (e) {
      showToast("订单发送失败");
    }
  };
  return { toastData, handleConfirmOrder };
};

export default {
  name: "OrderConfirmation",
  components: { TopArea, Toast },
  setup() {
    let showMask = ref(false);
    const route = useRoute();

    const shopId = route.params.id;
    const { productList, shopName, calculations } = useCommonCartEffect(shopId);

    const handleShowConfirmChange = status => {
      showMask = status;
    };

    const { toastData, handleConfirmOrder } = useMakeOrderEffect(
      shopId,
      shopName,
      productList
    );

    return {
      productList,
      shopName,
      calculations,
      showMask,
      toastData,
      handleShowConfirmChange,
      handleConfirmOrder
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/mixins.scss";
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  overflow-y: scroll;
}

.products {
  margin: 0.16rem 0.18rem 0.65rem 0.18rem;
  padding-bottom: 0.16rem;
  background: #fff;
  border-radius: 0.04rem;
  overflow-y: scroll;
  &__title {
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: #333333;
    padding: 0.16rem 0 0 0.16rem;
  }
  .product {
    display: flex;
    flex-direction: column;
    flex: 1;
    &__item {
      box-sizing: border-box;
      position: relative;
      display: flex;
      padding: 0.16rem 0.16rem 0 0.16rem;
      width: 100%;
      &__detail {
        overflow: hidden;
        width: 100%;
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
        position: relative;
      }
      &__yen {
        font-size: 0.12rem;
      }
      &__total {
        color: #333;
        position: absolute;
        right: 0;
      }
    }
  }
}

.order {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  &__price {
    flex: 1;
    background: #fff;
    font-size: 0.14rem;
    text-indent: 0.24rem;
    color: #333;
  }
  &__btn {
    width: 0.98rem;
    background: #4fb0f9;
    color: #fff;
    text-align: center;
    font-size: 0.14rem;
  }
}

.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    background: #ffffff;
    border-radius: 4px;
    width: 3.01rem;
    height: 1.57rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__title {
      font-size: 0.18rem;
      color: #333333;
      line-height: 0.25rem;
      margin: 0;
    }
    &__desc {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #666666;
      margin-top: 0.08rem;
      margin-bottom: 0.24rem;
    }
    &__btns {
      display: flex;
    }
    &__btn {
      border: 1px solid #4fb0f9;
      border-radius: 16px;
      font-size: 0.14rem;
      height: 0.3rem;
      line-height: 0.3rem;
      width: 0.78rem;
      text-align: center;
      margin: 0 0.12rem;
      &--cancel {
        color: #0091ff;
      }
      &--confirm {
        background: #4fb0f9;
        color: #fff;
      }
    }
  }
}
</style>
