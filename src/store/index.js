import { createStore } from "vuex";

export default createStore({
  state: {
    // { shopId: { shopName: '', productList: { productId: {} }}}
    cartList: {
      // 第一层级是商铺id
      // shopId: {
      //   // 第二层是商品id
      //   shopName: "",
      //   productList: {
      //     // 第三层内容是商品内容及购物数量
      //     productId: {
      //       imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
      //       name: "番茄 250g / 份",
      //       oldPrice: 39.6,
      //       price: 33.6,
      //       sales: 10,
      //       _id: "1",
      //       count: 2
      //     }
      //   }
      // }
    }
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
    },
    changeShopName(state, payload) {
      const { shopId, shopName } = payload;
      const shopInfo = state.cartList[shopId] || {
        shopName: "",
        productList: {}
      };
      shopInfo.shopName = shopName;
      state.cartList[shopId] = shopInfo;
    },
    changeCartItemChecked(state, payload) {
      const { shopId, productId } = payload;
      const product = state.cartList[shopId].productList[productId];
      product.check = !product.check;
    },
    clearCartProducts(state, payload) {
      const { shopId } = payload;
      state.cartList[shopId].productList = {};
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
    }
  },
  actions: {},
  modules: {}
});
