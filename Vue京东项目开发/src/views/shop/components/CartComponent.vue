<template>
  <!-- 蒙层 点击蒙层购物车消失 -->
  <div class="mask" v-if="showCart && count > 0" @click="handleShowCart"></div>
  <div class="cart">
    <!-- 清空购物车 -->
    <div class="product" v-if="showCart && count > 0">
      <ul>
        <li class="product__header">
          <div class="product__header__all">
            <span class="product__header__icon iconfont" @click="() => setallItemChecked(shopId)"
              v-html="allChecked ? '&#xe652;' : '&#xe667;'"></span>
            <span v-html="flag || allChecked ? '取消全选' : '全选'"></span>
          </div>
          <div class="product__header__clear">
            <span class="product__header__clear__btn" @click="() => cleanCartProduct(shopId)">清空购物车</span>
          </div>
        </li>
        <!-- 当数量为 0 不展示 -->
        <template v-for="item in productList " :key="item.id">
          <li class="product__item">
            <!-- 选中状态和未选中状态切换 -->
            <div class="product__item__checked iconfont" v-html="item.check ? '&#xe652;' : '&#xe667;'"
              @click="() => changeCartItemCheck(shopId, item.id)"></div>
            <img class="product__item__img" :src="item.imgURL" alt="">
            <div class="product__item__detail">
              <h4 class="product__item__title">{{ item.title }}</h4>
              <p class="product__item__price">
                <span class="product__item__yen">&yen;{{ item.price }}</span>
                <span class="product__item__origin">{{ item.prevprice }}</span>
              </p>
            </div>
            <div class="product__number">
              <span class="product__number__minus"
                @click="() => { changeCartItemInfo(shopId, item.id, item, -1) }">-</span>
              <!-- 数量本来就存在了每个商品信息中 -->
              {{ item.count || 0 }}
              <span class="product__number__plus" @click="() => { changeCartItemInfo(shopId, item.id, item, 1) }">+</span>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <!-- 结账 -->
    <div class="check">
      <!-- 手提包 -->
      <div class="check__icon">
        <img class="check__icon__img" src="http://www.dell-lee.com/imgs/vue3/basket.png" alt="" @click="handleShowCart">
        <!-- 数量 -->
        <div class="check__icon__tag">{{ count }}</div>
      </div>
      <!-- 总价 -->
      <div class="check__info">
        总价：<span class="check__info__price">&yen; {{ price }}</span>
      </div>
      <!-- 结算 -->
      <!-- 当总数大于 0 才让去结算 -->
      <div class="check__button" v-if="count > 0">
        <!-- 跳转页面 -->
        <router-link :to="{ path: `/order/${shopId}` }">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import usecommonCartEffect from '../../../effects/commoneffects'

/* 获取购物车信息逻辑 */
/* 计算总和和总价钱的逻辑 */
const useCartEffect = (shopId) => {
  /* 获取改变商品数量的方法和数据 */
  const { changeCartItemInfo, productList, price } = usecommonCartEffect(shopId)
  /* 获取全局数据 */
  const store = useStore()
  const cartList = store.state.cartList
  // /* 获取当前路径 */
  // const route = useRoute()
  // // /* 找到当前访问的店铺信息 */
  // const shopId = route.params.id

  /* 也可以合写 */
  /* const calculations = computed(() => {
    let total = 0,
    let price = 0
  }) */
  /* 计算总数 */
  /* 计算属性 当依赖发生变化就会进行计算 */
  const count = computed(() => {
    let total = 0
    const productList = cartList[shopId]?.productList
    if (productList) {
      for (const item in productList) {
        const product = productList[item]
        /* 加上每个商品的数量 */
        total += product.count
      }
    }
    return total
  })

  /* 选中效果的逻辑 */
  const changeCartItemCheck = (shopId, productId) => {
    /* 更改全局数据传递参数 */
    store.commit('changeCartItemCheck', {
      shopId, productId
    })
  }

  /* 清空购物车的逻辑 */
  const cleanCartProduct = (shopId) => {
    store.commit('cleanCartProduct', { shopId })
  }

  const flag = ref(true)
  /* 全选效果 */
  const allChecked = computed(() => {
    /* 获取商品列表 */
    const productList = cartList[shopId]?.productList
    let result = true
    if (productList) {
      for (const item in productList) {
        const product = productList[item]
        /* 此时此刻商品数量不为0 而且未被选中 */
        if (!product.check && product.count > 0) {
          result = false
          flag.value = false
        }
      }
    }
    return result
  })

  /* 点击全选 */
  const setallItemChecked = (shopId) => {
    if (flag.value) {
      flag.value = false
      store.commit('setallItemChecked', { shopId, flag })
    } else {
      flag.value = true
      store.commit('setallItemChecked', { shopId, flag })
    }
  }

  return { count, price, productList, flag, changeCartItemInfo, changeCartItemCheck, cleanCartProduct, allChecked, setallItemChecked }
}

/* 控制购物车显示状态 */
const useShowCartEffect = (showCart) => {
  const handleShowCart = () => {
    showCart.value = !showCart.value
  }
  return { handleShowCart }
}
export default {
  name: 'CartComponent',
  setup: () => {
    const route = useRoute()
    const shopId = route.params.id
    const showCart = ref(false)
    const { handleShowCart } = useShowCartEffect(showCart)
    const { count, price, productList, flag, changeCartItemInfo, changeCartItemCheck, cleanCartProduct, allChecked, setallItemChecked } = useCartEffect(shopId)
    return { count, price, productList, flag, showCart, handleShowCart, changeCartItemInfo, shopId, changeCartItemCheck, cleanCartProduct, allChecked, setallItemChecked }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/viriables.scss';
@import '../../../style/mixins.scss';

.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.5);
  z-index: 1;
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: $content-cart-bgColor;
}

.check {
  height: .49rem;
  line-height: .49rem;
  border-top: .01rem solid $content-borderColor;
  display: flex;
  overflow: hidden;

  &__icon {
    width: .84rem;
    position: relative;

    &__img {
      width: .28rem;
      height: .26rem;
      display: block;
      margin: .12rem auto;
    }

    &__tag {
      position: absolute;
      top: .06rem;
      left: .46rem;
      min-width: .2rem;
      height: .2rem;
      padding: 0 0.04rem;
      background: $content-cart-font-color;
      border-radius: .1rem;
      font-size: .12rem;
      line-height: .2rem;
      text-align: center;
      color: $content-cart-bgColor;
      transform: scale(0.6);
      transform-origin: left center;
    }
  }

  &__info {
    color: $content-font-color;
    flex: 1;
    font-size: .12rem;

    &__price {
      color: $content-cart-font-color;
      font-size: .18rem;
    }

  }

  &__button {
    width: .98rem;
    background-color: #4fb0f9;
    color: $content-cart-bgColor;
    font-size: .14rem;
    text-align: center;
  }
}

.product {
  flex: 1;
  background-color: $content-cart-bgColor;
  overflow-y: scroll;

  &__header {
    display: flex;
    line-height: .52rem;
    border: .01rem solid $content-borderColor;
    font-size: .14rem;
    color: #333;
    position: relative;
    padding-left: .35rem;

    &__clear {
      flex: 1;
      text-align: right;
      margin-right: .16rem;

      /* 撑起来 */
      &__btn {
        display: inline-block;
      }
    }

    &__all {
      width: .80rem;
      margin-left: .18rem;
    }

    &__icon {
      position: absolute;
      font-size: .2rem;
      color: #0091FF;
      top: 0;
      left: .16rem;
    }
  }

  &__item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid #F1F1F1;

    &__detail {
      /* 溢出文字隐藏 */
      overflow: hidden;
    }

    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }

    &__title {
      line-height: .20rem;
      font-size: .14rem;
      color: $content-font-color;
      font-weight: bold;
      @include ellipse
    }

    &__price {
      font-size: .14rem;
      color: #E93B3B;
      line-height: .2rem;
      margin: .06rem 0 0 0;
    }

    &__yen {
      font-size: .12rem;
    }

    &__origin {
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: #999;
      text-decoration: line-through;
    }

    &__checked {
      color: #0091FF;
      font-size: .20rem;
      line-height: .5rem;
      margin-right: .17rem;
    }

    .product__number {
      position: absolute;
      right: 0;
      bottom: .26rem;

      &__plus,
      &__minus {
        display: inline-block;
        width: .2rem;
        height: .2rem;
        border-radius: 50%;
        border: 0.01rem solid $content-item-font-color;
        text-align: center;
        font-size: .2rem;
        line-height: .17rem;
      }

      &__minus {
        border: .01rem solid $content-item-font-color;
        color: $content-item-font-color;
        margin-right: .05rem;
      }

      &__plus {
        background: #0091ff;
        color: $content-cart-bgColor;
        margin-left: .05rem;
      }
    }
  }
}
</style>
