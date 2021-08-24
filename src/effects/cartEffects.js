import { computed } from "vue";
import { useStore } from "vuex";

// 购物车相关逻辑
export const useCommonCartEffect = shopId => {
  const store = useStore();
  const cartList = store.state.cartList;
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    console.log(shopId, productId, productInfo);
    store.commit("changeCartItemInfo", { shopId, productId, productInfo, num });
  };
  const changeShopName = (shopId, shopName) => {
    store.commit("changeShopName", { shopId, shopName });
  };
  const changeCartItem = (shopId, productId, productInfo, num, shopName) => {
    changeCartItemInfo(shopId, productId, productInfo, num);
    changeShopName(shopId, shopName);
  };
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {};
    const notEmptyProductList = {};
    for (const i in productList) {
      const product = productList[i];
      if (product.count > 0) {
        notEmptyProductList[i] = product;
      }
    }
    return notEmptyProductList;
  });

  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || "";
    return shopName;
  });

  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList;
    let count = 0;
    let total = 0;
    let allChecked = true;
    if (productList) {
      for (const i in productList) {
        const product = productList[i];
        count += product.count;
        if (product.check) {
          total += product.count * product.price;
        }
        if (product.count && !product.check) {
          allChecked = false;
        }
      }
    }
    return { count, total: total.toFixed(2), allChecked };
  });

  return {
    cartList,
    productList,
    shopName,
    calculations,
    changeCartItemInfo,
    changeCartItem
  };
};
