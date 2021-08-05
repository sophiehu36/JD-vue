<template>
  <div class="wrapper">
    <div class="position">
      <span class="iconfont position__icon">&#xe631;</span>
      北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层
      <span class="iconfont position__notice">&#xe628;</span>
    </div>
    <div class="search">
      <span class="iconfont">&#xe602;</span>
      山姆会员商店优惠商品
    </div>
    <div class="banner">
      <img
        class="banner__img"
        src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
        alt="banner"
      />
    </div>
    <div>123123</div>
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
@import "./style/variables.scss";
@import "./style/mixins.scss";

.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem;
}

.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  font-size: 0.16rem;
  line-height: 0.22rem;
  color: $content-fontcolor;
  @include ellipsis;
  .position__icon {
    font-size: 0.2rem;
    position: relative;
    top: 0.015rem;
  }
  .position__notice {
    font-size: 0.2rem;
    position: absolute;
    right: 0rem;
    top: 0.175rem;
  }
}

.search {
  display: flex;
  align-items: center;
  line-height: 0.32rem;
  background: #f5f5f5;
  font-size: 0.14rem;
  color: #b7b7b7;
  border-radius: 0.16rem;
  margin-bottom: 0.12rem;
  .iconfont {
    font-size: 0.16rem;
    padding: 0 0.12rem 0 0.16rem;
  }
}

.banner {
  // 撑开页面，防止外链图片加载导致页面抖动
  height: 0;
  overflow: hidden;
  // 宽度的25.4%
  padding-bottom: 25.4%;
  &__img {
    width: 100%;
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
  color: $content-fontcolor;
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
