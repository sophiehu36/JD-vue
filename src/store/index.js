import { createStore } from "vuex";

// 保存已点选的产品信息
const setLocalCartList = state => {
  const cartListString = JSON.stringify(state.cartList);
  localStorage.cartList = cartListString;
};

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList);
  } catch (e) {
    return {};
  }
};

export default createStore({
  state: {
    // { shopId: { shopName: '', productList: { productId: {} }}}
    cartList: getLocalCartList()
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo } = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName: "",
        productList: {}
      };
      let product = shopInfo.productList[productId];
      if (!product) {
        product = productInfo;
        product.count = 0;
      }
      product.count += payload.num;
      if (payload.num) {
        product.check = true;
      }
      shopInfo.productList[productId] = product;
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);
    },
    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName: "",
        productList: {}
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
      setLocalCartList(state);
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      const product = state.cartList[shopId].productList[productId];
      product.check = !product.check;
      setLocalCartList(state);
    },
    clearCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].productList = {};
      setLocalCartList(state);
    },
    handleAllChecked(state, payload) {
      const { shopId, allChecked } = payload;
      const products = state.cartList[shopId].productList;
      if (products) {
        const keys = Object.keys(products);
        for (const i of keys) {
          // console.log("allChecked", allChecked);
          if (!allChecked) {
            state.cartList[shopId].productList[i].check = true;
          } else {
            state.cartList[shopId].productList[i].check = false;
          }
        }
      }
      setLocalCartList(state);
    }
  },
  actions: {},
  modules: {}
});
