<template>
  <!-- 顶部内容 -->
  <div class="top">
    <!-- 头部信息 -->
    <div class="top__header">
      <div class="iconfont top__header__back" @click="handleBackClick">&#xe660;</div>
      确认订单
    </div>
    <div class="top__receive">
      <div class="top__receive__title">收货地址</div>
      <div class="top__receive__address">前程大道108号刘集镇郑州工商学院</div>
      <div class="top__receive__info">
        <span class="top__receiver__info__name">贾帅军（先生）</span>
        <span class="top__receive__info__tel">17658913546</span>
      </div>
      <div class="iconfont top__receive__enter">&#xe660;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'TopArea',
  setup: () => {
    /* 获取路由 */
    /* 返回上一页 */
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/viriables.scss';

.top {
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 20%, #0091FF 70%);
  position: relative;

  &__header {
    position: relative;
    padding-top: .2rem;
    line-height: .24rem;
    color: $content-cart-bgColor;
    text-align: center;
    font-size: .16rem;

    &__back {
      position: absolute;
      top: .2rem;
      left: .18rem;
      font-size: .22rem;
    }
  }

  &__receive {
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    background: $content-cart-bgColor;
    border-radius: .04rem;

    &__title {
      line-height: .22rem;
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: $content-font-color;
    }

    &__address {
      line-height: .2rem;
      padding: 0rem .4rem 0 0.16rem;
      color: $content-font-color;
      font-size: .14rem
    }

    &__info {
      padding: .06rem 0 0 .16rem;

      &__name {
        font-size: .12rem;
        color: #666;
        line-height: .18rem;
        margin-right: .06rem;
      }
    }

    &__enter {
      position: absolute;
      right: .16rem;
      top: .5rem;
      font-size: .2rem;
      color: #666;
      font-size: .16rem;
      transform: rotate(180deg);
    }
  }
}
</style>
