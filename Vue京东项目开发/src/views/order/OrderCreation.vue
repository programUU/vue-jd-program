<template>
  <div class="wrapper">
    <!-- 头部组件 -->
    <TopArea />
    <!-- 商品组件 -->
    <ProductsList />
    <!-- 底部组件 -->
    <SubmitOrder />
  </div>
</template>

<script>
import TopArea from './components/TopArea.vue'
import ProductsList from './components/ProductsList.vue'
import SubmitOrder from './components/SumbitOrder.vue'
export default {
  name: 'OrderCreation',
  components: { TopArea, ProductsList, SubmitOrder }
}
</script>
<style lang="scss" scoped>
.wrapper {
  /* 溢出滚动条 */
  overflow-y: auto;
  background-color: #eee;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
