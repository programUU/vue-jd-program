<template>
  <!-- 第六部分 附近店铺 -->
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <!-- 给子组件传递参数 让子组件循环就行 -->
    <!-- :hideBorder="true" 是否添加下划线 -->
    <!-- 到底跳到哪一个页面 -->
    <router-link :to="`/shop/${ item.id }`" v-for="(item) of nearByList" :key="item.id" >
    <ShopComponent :item="item" :hideBorder="true" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../../utils/request'
import ShopComponent from '../../shop/ShopComponent.vue'
/* 封装发送请求 */
const useNearbyListEffect = () => {
  /* 响应式数据，变化影响 */
  const nearByList = ref([])
  /* 异步发送请求 等待获取数据 */
  const getNearbyList = async () => {
    const result = await get('/api/nearbyData')
    /* 获取前验证 */
    if (result?.success && result?.data?.jdData.length) {
      nearByList.value = result.data.jdData
    }
  }
  return { getNearbyList, nearByList }
}

export default {
  name: 'NearBy',
  components: { ShopComponent },
  setup () {
    /* 获取发送请求的方法 */
    const { getNearbyList, nearByList } = useNearbyListEffect()
    getNearbyList()
    return { nearByList, getNearbyList }
  }
}
</script>

<style lang="scss" scoped>
/* 引入 scss 变量 */
@import '../../../style/viriables.scss';
/* 引入  mixin */
@import '../../../style/mixins.scss';

/* 第六部分 */
.nearby {

  /* 标题 */
  &__title {
    font-size: .18rem;
    color: $content-font-color;
    margin: .16rem 0 .04rem 0;
    font-weight: normal;
  }
  a{
    text-decoration: none;
  }
}
</style>
