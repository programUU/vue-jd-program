<template>
  <!-- 第一部分 定位 -->
  <div class="position">
    <span class="iconfont position__icon">&#xe619;</span>
    前程大道108号刘集镇郑州工商学院
    <span class="iconfont position__notice">&#xe600;</span>
  </div>
  <!-- 第二部分 搜索框 -->
  <div class="search">
    <span class="iconfont search__iconfont">&#xe67d;</span>
    <input type="text" placeholder="山姆会员商店优惠商品" class="search__input">
  </div>
  <!-- 第三部分 banner -->
  <div class="banner">
    <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
  </div>
  <!-- 第四部分 -->
  <div class="icons">
    <div class="icons__item" v-for="(item, index) of staticPartList" :key="index">
      <img class="icons__item__img" :src="item.imgURL" alt="">
      <p class="icons__item__desc">{{ item.title }}</p>
    </div>
  </div>
  <!-- 第五部分 灰色区域 -->
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    /* 这里图片地址都一样可以把不同部分传进去 */
    const staticPartList = [
      { title: '超时便利', imgURL: 'http://www.dell-lee.com/imgs/vue3/超市.png' },
      { title: '菜市场', imgURL: 'http://www.dell-lee.com/imgs/vue3/菜市场.png' },
      { title: '水果店', imgURL: 'http://www.dell-lee.com/imgs/vue3/菜市场.png' },
      { title: '鲜花', imgURL: 'http://www.dell-lee.com/imgs/vue3/菜市场.png' },
      { title: '菜市场', imgURL: 'http://www.dell-lee.com/imgs/vue3/菜市场.png' },
      { title: '菜市场', imgURL: 'http://www.dell-lee.com/imgs/vue3/菜市场.png' },
      { title: '菜市场', imgURL: 'http://www.dell-lee.com/imgs/vue3/菜市场.png' },
      { title: '菜市场', imgURL: 'http://www.dell-lee.com/imgs/vue3/菜市场.png' },
      { title: '菜市场', imgURL: 'http://www.dell-lee.com/imgs/vue3/菜市场.png' },
      { title: '菜市场', imgURL: 'http://www.dell-lee.com/imgs/vue3/菜市场.png' }
    ]
    return { staticPartList }
  }
}
</script>

<!-- scss 语法 -->
<style lang="scss" scoped>
/* 引入 scss 变量 */
@import '../../../style/viriables.scss';
/* 引入  mixin */
@import '../../../style/mixins.scss';

/* 第一部分内容 顶部定位 */
.position {
  /* 引入代码（溢出文本省略显示） */
  @include ellipse;
  /* 为了调整图标位置 */
  position: relative;
  /* 挤出一点距离 不能让省略号和图标重合 */
  padding: .16rem .24rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  color: $content-font-color;

  /* 设置图标 */
  /* 和iconfont 同一级 容易造成优先级的问题 */
  /* 精确表示 */
  .position__icon {
    /* margin-right: .08rem; */
    font-size: .24rem;
    /* 文字和图标水平对齐 */
    /* vertical-align: middle; */
    position: relative;
    top: 0.04rem;
  }

  .position__notice {
    /* margin-right: .08rem; */
    /* 文字和图标水平对齐 */
    /* vertical-align: middle; */
    position: absolute;
    top: .18rem;
    right: 0;
    font-size: .2rem;
  }
}

.search {
  border-radius: .16rem;
  position: relative;
  margin-bottom: .12rem;

  /* 设置文本框内容 */
  &__input {
    color: #B7B7B7;
    line-height: .32rem;
    box-sizing: border-box;
    width: 100%;
    border-radius: .16rem;
    padding-left: .52rem;
    background: $content-bgColor;
    border: .01rem solid white;
    font-size: .14rem;
  }

  /* 设置图标位置 */
  &__iconfont {
    position: absolute;
    font-size: .2rem;
    line-height: .32rem;
    /* 垂直居中 */
    top: 50%;
    margin-top: -.16rem;
    left: .16rem;
  }
}

/* 第三部分 */
.banner {
  /* 防止图片抖动 */
  height: 0;
  overflow: hidden;
  /* 高度占宽度的百分之 25.4% */
  /*撑出来一个 25.4% 的高度 */
  padding-bottom: 25.4%;

  &__img {
    width: 100%;
  }
}

/* 第四部分 */
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;

  &__item {
    width: 20%;

    &__img {
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }

    &__desc {
      margin: .06rem 0 .16rem;
      text-align: center;
      color: $content-font-color;
    }
  }
}

/* 第五部分 */
.gap {
  /* 占满整个宽度 */
  margin: 0 -.18rem;
  height: .1rem;
  background: $content-bgColor;
}
</style>
