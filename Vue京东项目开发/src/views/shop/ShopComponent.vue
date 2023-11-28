<template>
  <div class="shop">
    <img class="shop__img" :src="item.iconURL" alt="">
    <div :class="{'shop__content':true, 'shop__content--border':hideBorder}">
      <div class="shop__content__title">{{ item.title }}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag" v-for="(value, index) in item.tags" :key="index">{{ value }}</span>
      </div>
      <div class="shop__content__highlight">VIP尊享满89元减4元优惠劵（每月3张）</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'hideBorder'],
  name: 'ShopComponent'
}
</script>

<style lang="scss" scoped>
/* 引入 scss 变量 */
@import '../../style/viriables.scss';
/* 引入  mixin */
@import '../../style/mixins.scss';

.shop {
  padding-top: .12rem;
  display: flex;

  /* 左侧图片 */
  &__img {
    margin-right: .16rem;
    width: .56rem;
    height: .56rem;
  }

  /* 右侧内容部分 */
  &__content {
    flex: 1;
    /* 加内边框 */
    padding-bottom: .12rem;
    &--border{
      border-bottom: .01rem solid $content-bgColor;
    }
    &__title {
      line-height: .22rem;
      font-size: .16rem;
      color: $content-font-color;
    }

    &__tags {
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-font-color;
    }

    &__tag {
      margin-right: .16rem;
    }

    &__highlight {
      margin: .08rem 0 0 0;
      line-height: .18rem;
      color: #e93b3b;
    }
  }
}
</style>
