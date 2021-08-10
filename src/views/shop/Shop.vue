<template>
  <div class="wrapper">
    <div class="detail">
      <div class="detail__search">
        <div class="back iconfont">&#xe601;</div>
      </div>
      <ShopInfo :item="item" v-show="item.imgUrl" :hide-border="true" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { get } from "@/utils/request";
import ShopInfo from "@/components/ShopInfo.vue";

const useShopInfoEffect = () => {
  const route = useRoute();

  const data = reactive({ item: {} });
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`);
    console.log(result);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data;
    }
  };

  const { item } = toRefs(data);

  return { item, getItemData };
};

export default {
  name: "Shop",
  components: { ShopInfo },
  setup() {
    const router = useRouter();

    const { item, getItemData } = useShopInfoEffect();
    getItemData();
    const handleBackClick = () => {
      router.back();
    };
    return { item, getItemData, handleBackClick };
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 0.36rem;
}

.detail {
  padding-left: 0.18rem;
}
</style>
