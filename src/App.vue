<template>
  <div class="wrapper">
    <div class="position">
      <span class="iconfont position__icon">&#xe631;</span>
      <span class="position__text">北京理工大学国防科技园2号楼10层</span>
      <span class="iconfont position__icon">&#xe628;</span>
    </div>
  </div>
  <div class="docker">
    <div class="docker__item docker__item--active">
      <div class="iconfont">&#xe600;</div>
      <div class="docker__title ">首页</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe603;</div>
      <div class="docker__title">购物车</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe6e1;</div>
      <div class="docker__title">订单</div>
    </div>
    <div class="docker__item">
      <div class="iconfont">&#xe63c;</div>
      <div class="docker__title">我的</div>
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem;
}

.position {
  padding: 0.16rem 0;
  font-size: 0.16rem;
  display: flex;
  align-items: baseline;
  .position__icon {
    font-size: 0.2rem;
    display: flex;
  }
  &__text {
    margin: 0 0.4rem 0 0.085rem;
    text-overflow: ellipsis;
  }
}

.docker {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid #f1f1f1;
  &__item {
    display: inline-block;
    text-align: center;
    &--active {
      color: #1fa4fc;
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
