import { createStore } from 'vuex'
/* 本地存储 */
const setLocalCartList = (carList) => {
  const cartListString = JSON.stringify(carList)
  localStorage.setItem('cartList', cartListString)
  /* localStorage.carList = cartListString */
}
/* 获取本地存储数据 */
const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.getItem('cartList')) || {}
  } catch (e) {
    return {}
  }
}
/* 购物车存储数据 */
/* { shopId: { shopName: '', productList: {productId:{}}} } */
export default createStore({
  state: {
    cartList: getLocalCartList()
  },
  getters: {
  },
  mutations: {
    /* payload存储传递的参数 */
    changeCartItemInfo: (state, payload) => {
      /* number 表示 加 还是 减 */
      const { shopId, productId, productInfo, number } = payload
      /* 如果获取的数据为空那就赋给一个空对象 */
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      /* 如果商铺信息没有那么就给一个空对象 */
      /* if (!shopInfo) {
        shopInfo = {}
      } */
      let product = shopInfo.productList[productId]
      /* 如果商品信息没有那么就将传递过来的商品信息放进去 */
      if (!product) {
        productInfo.count = 0
        /* 没加入购物车之前就是 0 添加 count 属性 */
        product = productInfo
      }
      /* 放进去的时候就要给数量加 1 */
      product.count += number
      if (number > 0) {
        /* 如果添加内容也赋予选中状态 */
        product.check = true
      }
      if (product.count < 0) {
        product.count = 0
      }
      /* 再把这个商品信息放到对应的商铺下面 */
      shopInfo.productList[productId] = product
      /* 再把商铺信息放到 全局变量里面 */
      state.cartList[shopId] = shopInfo
      setLocalCartList(state.cartList)
    },
    /* 选中状态 */
    changeCartItemCheck: (state, payload) => {
      const { shopId, productId } = payload
      const product = state.cartList[shopId]?.productList[productId]
      product.check = !product.check
      /* console.log(shopId, productId) */
      setLocalCartList(state.cartList)
    },
    /* 清空购物车 */
    cleanCartProduct: (state, payload) => {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      // /* 删除商品列表中的每一项 */
      // for (const item in productList) {
      //   delete productList[item]
      // }
      setLocalCartList(state.cartList)
    },
    /* 全选 */
    setallItemChecked: (state, payload) => {
      const { shopId, flag } = payload
      const productList = state.cartList[shopId]?.productList
      if (productList) {
        for (const item in productList) {
          productList[item].check = flag.value
        }
      }
      setLocalCartList(state.cartList)
    },
    /* 修改店铺名字 */
    changeShopName: (state, payload) => {
      const { shopId, shopName } = payload
      /* 如果商铺信息为空 */
      /* 默认为空 */
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      /* 添加属性 */
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state.cartList)
    }
  }
})
