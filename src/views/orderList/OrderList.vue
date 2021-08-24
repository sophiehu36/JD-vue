<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order">
        <div class="order__title">
          沃尔玛
          <span class="order__status">已取消</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <img src="" alt="" class="order__content__img" />
            <img src="" alt="" class="order__content__img" />
            <img src="" alt="" class="order__content__img" />
            <img src="" alt="" class="order__content__img" />
          </div>
          <div class="order__info">
            <div class="order__info__price">￥66.69</div>
            <div class="order__info__count">共2件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :current-index="2" />
</template>

<script>
import Docker from "../../components/Docker.vue";
export default {
  name: "OrderList",
  components: { Docker }
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
  padding: 0.16rem;
  margin: 0.16rem 0.18rem;
  display: flex;
  flex-direction: column;
  &__title {
    font-size: 0.16rem;
    color: #333;
  }
}
</style>
