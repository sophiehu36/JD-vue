<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Docker />
</template>

<script>
import Docker from "./Docker.vue";
import Nearby from "./Nearby.vue";
import StaticPart from "./StaticPart.vue";

export default {
  name: "Home",
  components: { StaticPart, Nearby, Docker }
};
</script>

<style lang="scss">
// @import "@/style/variables.scss";
// @import "@/style/mixins.scss";

.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  padding: 0 0.18rem 0.2rem 0.18rem;
  overflow-y: auto;
}
</style>
