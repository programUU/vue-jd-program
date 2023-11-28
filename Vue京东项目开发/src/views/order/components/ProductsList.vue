<template>
  <div class="product">
    <div class="product__title">
      {{ shopName }}
    </div>
    <div class="product__wrapper">
      <div class="product__list">
        <ul>
          <li class="product__item" v-for=" item  in  productList " :key="item.id">
            <img class="product__item__img" :src="item.imgURL" alt="">
            <div class="product__item__detail">
              <h4 class="product__item__title">{{ item.title }}</h4>
              <p class="product__item__price">
                <span>
                  <span class="product__item__yen">&yen;</span>
                  {{ item.price }} x {{ item.count }}
                </span>
                <span class="product__item__totalprice">
                  <span class="product__item__yen">&yen;</span>
                  {{ (item.count * item.price).toFixed(2) }}
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import usecommonCartEffect from '../../../effects/commoneffects'
export default {
  name: 'ProductsList',
  setup: () => {
    /* 获取商铺 id */
    const route = useRoute()
    const shopId = route.params.id
    /* 从购物车内获取数据 */
    /* 商品、商铺名字、总价格 */
    const { productList, shopName, price } = usecommonCartEffect(shopId)
    return { productList, shopName, price }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/viriables.scss';
@import '../../../style/mixins.scss';

.product {
  margin: .16rem .18rem .3rem .18rem;
  background-color: $content-cart-bgColor;

  &__title {
    line-height: .22rem;
    color: $content-font-color;
    padding: .16rem;
    font-size: .18rem;
  }

  &__wrapper {
    overflow-y: scroll;
    position: absolute;
    left: 0;
    right: 0;
    bottom: .6rem;
    top: 2.64rem;
    margin: 0 .18rem;
  }

  &__list {
    background-color: $content-cart-bgColor;
  }

  &__item {
    position: relative;
    display: flex;
    padding: 0 .16rem .16rem .16rem;

    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }

    &__detail {
      flex: 1;
    }

    &__title {
      line-height: .20rem;
      font-size: .14rem;
      color: $content-font-color;
      font-weight: bold;
      @include ellipse
    }

    &__price {
      margin: .06rem 0 0 0;
      font-size: .14rem;
      color: #E93B3B;
      line-height: .2rem;
      display: flex;
    }

    &__totalprice {
      flex: 1;
      text-align: right;
      color: #000;
    }

    &__yen {
      font-size: .12rem;
    }
  }
}
</style>
