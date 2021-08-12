import { createStore } from "vuex";

export default createStore({
  state: {
    cartList: {
      // 第一层级是商铺id
      // shopId: {
      // 第二层是商品id
      // 第二层内容是商品内容及购物数量
      // productId: {
      //   imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
      //   name: "番茄 250g / 份",
      //   oldPrice: 39.6,
      //   price: 33.6,
      //   sales: 10,
      //   _id: "1",
      //   count: 2
      // }
      // }
    }
  },
  mutations: {
    changeCartItemInfo(state, payload) {
      const { shopId, productId, productInfo } = payload;
      let shopInfo = state.cartList[shopId];
      if (!shopInfo) {
        shopInfo = {};
      }
      let product = shopInfo[productId];
      if (!product) {
        product = productInfo;
        product.count = 0;
      }
      product.count += payload.num;
      if (payload.num) {
        product.check = true;
      }
      shopInfo[productId] = product;
      state.cartList[shopId] = shopInfo;
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      const product = state.cartList[shopId][productId];
      product.check = !product.check;
    },
    clearCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId] = {};
    }
  },
  actions: {},
  modules: {}
});
