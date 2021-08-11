<template>
  <div class="cart">
    <div class="check">
      <div class="check__icon">
        <img
          class="check__icon__img"
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          alt=""
        />
        <div class="check__icon__tag">1</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen;127</span>
      </div>
      <div class="check__btn">去结算</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart"
};
</script>

<style lang="scss" scoped>
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
      right: 0.2rem;
      width: 0.2rem;
      height: 0.2rem;
      line-height: 0.2rem;
      background: #e93b3b;
      color: #fff;
      border-radius: 50%;
      font-size: 0.12rem;
      text-align: center;
      transform: scale(50%);
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
