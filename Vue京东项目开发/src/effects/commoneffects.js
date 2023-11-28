
/* 使用购物车的逻辑 */
import { computed } from 'vue'
import { useStore } from 'vuex'
const usecommonCartEffect = (shopId) => {
  /* 获取全局数据 */
  const store = useStore()
  /* 点击事件往全局数据里面存储数据 */
  const changeCartItemInfo = (shopId, productId, productInfo, number) => {
    /* 更改全局数据传递参数 */
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, number
    })
  }
  /* store里面的数据也会自动变成 reactive */
  const cartList = store.state.cartList
  /* 当前购物车商铺下有什么内容 */
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    /* 排除掉数量为 0 的商品 */
    const notEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })
  /* 获取 shopName */
  /* 这种写法为了以后shopName发生改变 */
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })
  /* 计算总价 */
  /* 计算属性 当依赖发生变化就会进行计算 */
  const price = computed(() => {
    let total = 0
    const productList = cartList[shopId]?.productList
    /* 计算总数量 */
    if (productList) {
      for (const item in productList) {
        const product = productList[item]
        if (product.check) {
          /* 加上每个商品的小计 */
          total += (product.count * product.price)
        }
      }
    }
    return total.toFixed(2)
  })
  return { cartList, price, changeCartItemInfo, productList, shopName }
}

export default usecommonCartEffect
