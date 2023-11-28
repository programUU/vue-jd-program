<template>
  <div class="wrapper">
    <span class="iconfont wrapper__left__iconfont" @click="handleBackClick">&#xe660;</span>
    <div class="wrapper__search">
      <span class="iconfont wrapper__search__iconfont">&#xe67d;</span>
      <input type="text" placeholder="请输入商品名称搜索" class="wrapper__search__input">
    </div>
    <!-- 防止出现劣图，当加载完才展示 -->
    <ShopCompnent :item="item" :hideBorder="false" v-if="item.iconURL" />
    <!-- 中间内容 -->
    <ContentComponent :shopName="item.title"/>
    <!-- 底部内容 -->
    <CartComponent />
  </div>
</template>

<script>
import { get } from '../../utils/request.js'
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import ContentComponent from './components/ContentComponent.vue'
/* 用到 shopcomponent子组件 */
import ShopCompnent from './ShopComponent.vue'
import CartComponent from './components/CartComponent.vue'
/* 获取当前商铺信息 */
/* 封装路由跳转不同页面 */
const useShopInfoEffect = () => {
  /* 当前访问路径的一些信息 */
  const route = useRoute()
  /* reactive 能将一次性替换数据变得很精简 */
  const data = reactive({
    item: {}
  })
  /* 发送请求 */
  /* 后期需要不同的接口这里数据放到一个接口里面 */
  const getItemData = async () => {
    const result = await get('/api/nearbyData')
    /* 循环遍历所有的数据 */
    /* 根据 id 匹配数据 */
    for (const item in result.data.jdData) {
      if (result?.success && result?.data.jdData && ((Number(item) + 1) === Number(route.params.id))) {
        data.item = result.data.jdData[item]
      }
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

/* 封装返回上一页 */
const useBackRouterEffect = () => {
  /* 跳转页面 */
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
    /* router.push({ name: 'home' }) */
  }
  return { handleBackClick }
}

export default {
  name: 'ShopInfo',
  components: { ShopCompnent, ContentComponent, CartComponent },
  setup () {
    /* 获取数据的一些方法、数据 */
    const { item, getItemData } = useShopInfoEffect()
    /* 获取数据 */
    getItemData()
    /* 获取返回上一页的方法 */
    const { handleBackClick } = useBackRouterEffect()

    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
/* 引入 scss 变量 */
@import '../../style/viriables.scss';

.wrapper {
  padding: 0 .18rem;
  display: flex;
  flex-direction: column;
  &__left__iconfont {
    scale: 1.5;
    position: absolute;
    top: .22rem;
    left: .17rem;
  }

  &__search {
    border-radius: .16rem;
    position: relative;
    margin: 0.14rem 0 .04rem .24rem;

    /* 设置文本框内容 */
    &__input {
      color: black;
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
}
</style>
