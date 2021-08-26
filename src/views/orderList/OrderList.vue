<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in data.list" :key="index">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">{{
            item.isCanceled ? "已取消" : "已下单"
          }}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template
              v-for="(innerItem, innerIndex) in item.products"
              :key="innerIndex"
            >
              <img
                :src="innerItem.product.img"
                alt=""
                class="order__content__img"
                v-if="innerIndex <= 3"
              />
            </template>
          </div>
          <div class="order__info">
            <div class="order__info__price">￥{{item.total}}</div>
            <div class="order__info__count">共{{ item.products.length }}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :current-index="2" />
</template>

<script>
import { reactive } from "vue";
import { get } from "@/utils/request";
import Docker from "../../components/Docker.vue";

// 处理订单列表逻辑
const useOrderListEffect = () => {
  const data = reactive({ list: [] });
  const getOrderList = async () => {
    const result = await get("/api/order");
    console.log(result);
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data;
      orderList.forEach(order => {
        const products = order.products;
        let total = 0;
        products.forEach(
          productItem =>
            (total += productItem.product.price * productItem.orderSales)
        );
        order.total = total
      });
      data.list = orderList;
    }
  };
  getOrderList();
  return { data };
};

export default {
  name: "OrderList",
  components: { Docker },
  setup() {
    const { data } = useOrderListEffect();
    return { data };
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.51rem;
  right: 0;
  background: #f8f8f8;
  // padding: 0 0.18rem 0.2rem 0.18rem;
  overflow-y: auto;
}

.title {
  line-height: 0.44rem;
  background: #fff;
  font-size: 0.16rem;
  color: #333;
  text-align: center;
}

.orders {
  display: flex;
  flex-direction: column;
}

.order {
  background: #fff;
  border-radius: 0.04rem;
  padding: 0.16rem;
  margin: 0.16rem 0.18rem;
  display: flex;
  flex-direction: column;
  &__title {
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: #333;
  }
  &__status {
    font-size: 0.14rem;
    color: #999999;
    float: right;
  }
  &__content {
    display: flex;
    margin-top: 0.16rem;
    &__img {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.12rem;
    }
  }
  &__info {
    text-align: right;
    flex: 1;
    &__price {
      font-size: 0.14rem;
      color: #e93b3b;
      line-height: 0.2rem;
    }
    &__count {
      font-size: 0.12rem;
      color: #333333;
      line-height: 0.14rem;
    }
  }
}
</style>
