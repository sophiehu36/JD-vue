<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link
      :to="`/shop/${item._id}`"
      v-for="item in nearbyList"
      :key="item._id"
    >
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from "vue";
import { get } from "@/utils/request";
import ShopInfo from "@/components/ShopInfo.vue";

const useNearbyListEffect = () => {
  const nearbyList = ref([]);

  const getNearbyList = async () => {
    const result = await get("/api/shop/hot-list");
    console.log(result);
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data;
    }
  };

  return { nearbyList, getNearbyList };
};

export default {
  name: "Nearby",
  components: { ShopInfo },
  setup() {
    const { nearbyList, getNearbyList } = useNearbyListEffect();

    getNearbyList();

    return { nearbyList };
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/variables.scss";

.nearby {
  &__title {
    color: $content-fontColor;
    font-size: 0.18rem;
    margin: 0.16rem 0 0.02rem 0;
  }
  a {
    text-decoration: none;
  }
}
</style>
