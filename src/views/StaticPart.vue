<template>
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
  <div class="icons">
    <div v-for="item in iconData" class="icons__item" :key="item.desc">
      <img
        :src="require('../assets/imgs/' + item.icon)"
        alt=""
        class="icons__item__img"
      />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: "StaticPart",
  setup() {
    const iconData = [
      { icon: "超市.png", desc: "超市便利" },
      { icon: "菜市场.png", desc: "菜市场" },
      { icon: "水果店.png", desc: "水果店" },
      { icon: "鲜花.png", desc: "鲜花绿植" },
      { icon: "医药健康.png", desc: "医药健康" },
      { icon: "家居.png", desc: "家居时尚" },
      { icon: "蛋糕.png", desc: "烘焙蛋糕" },
      { icon: "签到.png", desc: "签到" },
      { icon: "大牌免运.png", desc: "大牌免运" },
      { icon: "红包.png", desc: "红包套餐" }
    ];
    return { iconData };
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";
@import "@/style/mixins.scss";

.position {
  position: relative;
  padding: 0.16rem 0.24rem 0.16rem 0;
  font-size: 0.16rem;
  line-height: 0.22rem;
  color: $content-fontColor;
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

.icons {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    margin-top: 0.16rem;
    &__img {
      width: 0.4rem;
      height: 0.4rem;
    }
    &__desc {
      margin-top: 0.06rem;
      margin-bottom: 0;
      color: $content-fontColor;
    }
  }
}

.gap {
  margin: 0.16rem -0.18rem 0 -0.18rem;
  height: 0.1rem;
  background: $content-bgColor;
}
</style>
