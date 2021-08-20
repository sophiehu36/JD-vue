<template>
  <div class="wrapper">
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
    <div class="products">
      <div class="products__title">{{ shopName }}</div>
      <div class="products__list">
        <div class="product">
          <div
            class="product__item"
            v-for="item in productList"
            :key="item._id"
          >
            <img class="product__item__img" :src="item.imgUrl" alt="" />
            <div class="product__item__detail">
              <h4 class="product__item__title">{{ item.name }}</h4>
              <p class="product__item__price">
                <span class="product__item__yen">&yen;</span>{{ item.price }} x
                {{ item.count }}
                <span class="product__item__total"
                  ><span class="product__item__yen">&yen;</span
                  >{{ item.price * item.count }}</span
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
      <div class="order__btn">提交订单</div>
    </div>
  </div>
</template>

<script>
import { useCommonCartEffect } from "../../effects/cartEffects";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "OrderConfirmation",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const shopId = route.params.id;
    const { productList, shopName, calculations } = useCommonCartEffect(shopId);
    const handleBackClick = () => {
      router.back();
    };
    return { productList, shopName, calculations, handleBackClick };
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

.products {
  margin: 0.16rem 0.18rem 0.65rem 0.18rem;
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
      padding: 0.16rem;
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
</style>
