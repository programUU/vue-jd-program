<template>
  <div class="order">
    <div class="order__price">实付金额 <b>&yen;{{ price }}</b></div>
    <div class="order__button" @click="() => handleShowMask(true)">提交订单</div>
  </div>
  <div class="mask" v-if="showMask" @click="() => handleShowMask(false)">
    <!-- 防止事件传播 -->
    <div class="mask__content" @click.stop>
      <h3 class="mask__content__title">确认离开收银台码？</h3>
      <p class="mask__content__dsc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--first" @click="() => handleConfirmOrder(true)">取消订单</div>
        <div class="mask__content__btn mask__content__btn--second" @click="() => handleConfirmOrder(false)">确认支付</div>
      </div>
    </div>
  </div>
  <!-- 弹窗 -->
  <!-- <ToastComponent /> -->
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import usecommonCartEffect from '../../../effects/commoneffects'
import post from '../../../utils/request'
import { useStore } from 'vuex'
import { ref } from 'vue'

/* 提交订单的逻辑 */
const useConfimeEffect = () => {
  /* 全局数据对象 */
  const store = useStore()
  /* 跳转路由 */
  const router = useRouter()
  /* 获取商铺 id */
  const route = useRoute()
  const shopId = route.params.id
  /* 从购物车内获取总价格 */
  const { price, shopName, productList } = usecommonCartEffect(shopId)

  /* 确认支付/取消订单 */
  /* 发送 post 请求 */
  /*  异步操作 */
  /* isCanceled 是否取消订单 */
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    /* 获取到商品的 id 和 数量 */
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product.id), num: product.count })
    }
    /* 先不管接口 点击默认提交成功 */
    router.push({ name: 'orderList' })
    /* 如果提交订单成功购物车清空 */
    store.commit('cleanCartProduct', { shopId })
    try {
      /* 代码优化 */
      /* 等待 post 解析完毕 */
      /* 传递数据 */
      const result = await post('/api/geData', {
        addressId: 1,
        shopId: parseInt(shopId),
        shopName: shopName.value,
        isCanceled,
        products
      })
      console.log(result)
      if (result?.error === 0) {
        router.push({ name: 'home' })
      }
    } catch (e) {
      console.log('下单失败')
    }
  }
  return { price, handleConfirmOrder }
}

/* 蒙层展示相关逻辑 */
const useShowMaskEffect = () => {
  const showMask = ref(false)
  /* 确认提交订单弹窗 */
  const handleShowMask = (status) => {
    showMask.value = status
  }
  return { handleShowMask, showMask }
}
export default {
  name: 'SubmitOrder',
  setup: () => {
    /* 提交订单方法和总金额 */
    const { price, handleConfirmOrder } = useConfimeEffect()
    /* 展示maks的方法 */
    const { handleShowMask, showMask } = useShowMaskEffect()
    return { price, handleConfirmOrder, handleShowMask, showMask }
  }
}

</script>
<style lang="scss" scoped>
@import '../../../style/viriables.scss';

.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: .49rem;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background-color: $content-cart-bgColor;

  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-font-color;
  }

  &__button {
    width: .98rem;
    background-color: $content-order-bgColor;
    color: $content-cart-bgColor;
    text-align: center;
    font-size: .14rem;
  }
}

.mask {
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba($color: #000000, $alpha: 0.5);

  &__content {
    width: 3rem;
    height: 1.57rem;
    background: $content-cart-bgColor;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    border: radius 0.04rem;
    text-align: center;

    &__title {
      margin: .24rem 0 0 0;
      font-size: .18rem;
      color: $content-font-color;
      line-height: .26rem;
    }

    &__dsc {
      margin: .24rem 0 0 0;
      font-size: .14rem;
      color: #666;
      margin-top: .08rem;
    }

    &__btns {
      display: flex;
      margin: .24rem .58rem 0 .58rem;
    }

    &__btn {
      flex: 1;
      width: .80rem;
      height: .32rem;
      border-radius: .16rem;
      line-height: .32rem;
      font-size: .14rem;

      &--first {
        color: $content-order-bgColor;
        margin-right: .12rem;
        border: .01rem solid $content-order-bgColor;
      }

      &--second {
        margin-left: .12rem;
        background: $content-order-bgColor;
        color: $content-cart-bgColor;
      }
    }
  }
}
</style>
