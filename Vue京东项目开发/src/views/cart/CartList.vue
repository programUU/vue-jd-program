<template>
  <div class="wrapper">
  This is CartList!!
  </div>
  <DockerComponent :currentIndex="1"/>
</template>

<script>
import DockerComponent from '../../components/DockerComponent.vue'
export default {
  name: 'CartList',
  components: { DockerComponent }
}
</script>

<style lang="scss" scoped>
.wrapper {
  /* 解决定位那个问题 */
  /* 纵向滚动 */
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  /* 左右都右距离 */
  padding: 0 .18rem .1rem .18rem;
}
</style>
