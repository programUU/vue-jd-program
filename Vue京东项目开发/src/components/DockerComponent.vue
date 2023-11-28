<template>
  <nav class="docker">
    <!-- 循环减轻代码量 -->
    <!-- 当为第一项的时候 显示样式 -->
    <span :class="{ 'docker__item': true, 'docker__item--active': index === currentIndex }"
      v-for="(item, index) in dockerList" :key="item.text">
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker__title">{{ item.text }}</div>
      </router-link>
    </span>
  </nav>
</template>

<script>
export default {
  name: 'DockerComponent',
  props: ['currentIndex'],
  setup: () => {
    const dockerList = [
      { icon: '&#xe674;', text: '首页', to: { name: 'home' } },
      { icon: '&#xe73d;', text: '购物车', to: { name: 'cart' } },
      { icon: '&#xe713;', text: '订单', to: { name: 'orderList' } },
      { icon: '&#xe63a;', text: '我的', to: { name: 'home' } }
    ]
    return { dockerList }
  }
}
</script>

<!-- 这个样式被锁了 只对该组件有效 -->
<style lang="scss" scoped>
/* 引入 scss 变量 */
@import '../style/viriables.scss';
/* 引入  mixin */
@import '../style/mixins.scss';

.docker {
  position: absolute;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  padding: 0 .18rem;
  width: 100%;
  /* 0.49 * 100 */
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  /* 一维用flex */
  display: flex;

  /* scss 语法 */
  /* & 代表 docker */
  &__item {
    /* 均匀分配空间 */
    flex: 1;
    text-align: center;

    a {
      color: $content-font-color;
      text-decoration: none;
    }

    /* 设置小图标样式 */
    .iconfont {
      font-size: .2rem;
      margin: 0.1rem 0 0.02rem 0;
    }

    /* 设置选中状态 */
    /* & 表示 docker__item */
    &--active {
      a {
        color: #1fa4fc;
      }
    }
  }

  /* 设置文字大小 */
  &__title {
    font-size: .2rem;
    /* 显示更小像素的文字大小 */
    /* 横纵 缩小 0.5 */
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
