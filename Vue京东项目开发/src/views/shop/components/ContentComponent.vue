<template>
  <div class="content">
    <div class="category">
      <ul>
        <!-- 点击事件将当前点击的对象的 tab 值传递出去 -->
        <li :class="{ 'category__item': true, 'category__item--active': currentTab === item.tab }"
          v-for="(item, index) of categories" :key="index" @click="() => handleCategoryClick(item.tab)">{{ item.name }}
        </li>
      </ul>
    </div>
    <div class="product">
      <ul>
        <li class="product__item" v-for="(item, index) of item" :key="index">
          <img class="product__item__img" :src="item.imgURL" alt="">
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.title }}</h4>
            <p class="product__item__sales">{{ item.sales }}</p>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;{{ item.price }}</span>
              <span class="product__item__origin">{{ item.prevprice }}</span>
            </p>
          </div>
          <div class="product__number">
            <span class="product__number__minus"
              @click="() => { changeCartItem(shopId, item.id, item, -1, shopName) }">-</span>
            {{ cartList?.[shopId]?.productList?.[item.id]?.count || 0 }}
            <span class="product__number__plus"
              @click="() => { changeCartItem(shopId, item.id, item, 1, shopName) }">+</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import usecommonCartEffect from '../../../effects/commoneffects'
import { get } from '.././../../utils/request'
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
/* 常量 */
const categories = [
  {
    name: '全部商品',
    tab: 'all'
  },
  {
    name: '秒杀',
    tab: 'seckill'
  },
  {
    name: '新鲜水果',
    tab: 'fruit'
  }
]
/* 列表内容相关的数据 */
const useGetDataEffect = (currentTab, shopId) => {
  const data = reactive({
    item: [],
    /* 将匹配到的数据先存到空数组 */
    list: []
  })
  const getContentData = async (currentTab) => {
    /* 这个时候可以通过传递参数tab获取不同的数据 */
    /* /api/contentData/tab */
    /* 这里还是把数据放到一个接口里面 根据tab匹配数据 */
    /* 这里需要用到 router获取路径 */
    /* 因为每次点击获取的内容都不一样 */
    /* /shop/1/contentData/tab */
    /* /shop/2/contentData/tab */
    const result = await get('/api/contentData', {
      tab: currentTab
    })
    /* 严谨 */
    if (result?.success && result?.data) {
      /* 插入新的数据之前将数组内容清空 */
      data.list = []
      /* 循环所有的数据 */
      for (const index in result.data.contentList) {
        /* 找到与传递的 tab 匹配的数据 */
        if (currentTab === 'all') {
          data.item = result.data.contentList
        } else if (result.data.contentList[index].tab === currentTab) {
          data.list.push(result.data.contentList[index])
          data.item = data.list
        }
      }
    }
  }
  /* 监听依赖，依赖改变就会改变 */
  watchEffect(() => {
    getContentData(currentTab.value)
  })
  const { item } = toRefs(data)
  return { getContentData, item }
}

/* 点击tab栏执行的逻辑 */
/* 点击tab栏需要发送数据 传递一个函数参数 */
const useClickTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleCategoryClick = (tab) => {
    /* getContentData(tab) */
    currentTab.value = tab
  }
  return { handleCategoryClick, currentTab }
}

/*  */
const useCarEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = usecommonCartEffect()
  /* 增加商铺名字属性 */
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  /* 店铺名也要有 */
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    /* 控制商品数量 */
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  // /* 对单个商品总数量优化 */
  // const getProductCartCount = (shopId, productId) => {
  //   return cartList?.[shopId]?.productList?.[productId]?.count || 0
  // }
  return { cartList, changeCartItem }
}
export default {
  name: 'ContentComponent',
  /* 店铺名字 */
  props: ['shopName'],
  setup: () => {
    /* 获取实例 */
    const route = useRoute()
    /* 获取商店 id */
    const shopId = route.params.id
    /* 点击tab触发事件 */
    /* const { handleCategoryClick, categories, currentTab } = useClickTabEffect(getContentData) */
    const { handleCategoryClick, currentTab } = useClickTabEffect()
    /* 获取数据 */
    const { getContentData, item } = useGetDataEffect(currentTab, shopId)
    /* 控制数量 增添店铺名称属性 */
    const { cartList, changeCartItem } = useCarEffect()

    return { getContentData, changeCartItem, item, shopId, cartList, categories, currentTab, handleCategoryClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style//viriables.scss';
@import '../../../style/mixins.scss';

.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}

.category {
  width: .76rem;
  background: #f5f5f5;
  height: 100%;
  overflow-y: scroll;

  &__item {
    line-height: .4rem;
    text-align: center;
    border-radius: .04rem;
    font-size: .14rem;
    color: $content-font-color;

    &--active {
      background: rgb(219, 100, 100);
    }
  }
}

.product {
  flex: 1;
  overflow-y: scroll;

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
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }

    &__title {
      line-height: .20rem;
      font-size: .14rem;
      color: $content-font-color;
      font-weight: bold;
      @include ellipse
    }

    &__sales {
      margin: .06rem 0;
      font-size: .12rem;
      color: $content-font-color;
      line-height: .16rem;
    }

    &__price {
      font-size: .14rem;
      color: #E93B3B;
      line-height: .2rem;
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

    .product__number {
      position: absolute;
      right: 0;
      bottom: .12rem;

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
        color: #FFF;
        margin-left: .05rem;
      }
    }
  }
}
</style>
