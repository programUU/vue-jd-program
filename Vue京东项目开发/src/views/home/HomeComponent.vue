<!-- 首页 -->
<template>
  <!-- 整个内容区域 -->
  <div class="wrapper">
    <!-- 子组件A -->
    <StaticPart />
    <!-- 子组件B -->
    <NearBy />
  </div>
  <!-- 底部内容 -->
  <DockerComponent :currentIndex="0"/>
</template>

<script>
/* 子组件A */
import StaticPart from './components/StaticPart.vue'
/* 子组件B */
import NearBy from './components/NearBy.vue'
/* 子组件C */
import DockerComponent from '../../components/DockerComponent.vue'

export default {
  name: 'HomeComponent',
  /* 注册组件 */
  components: {
    DockerComponent, StaticPart, NearBy
  }
}
</script>

<!-- scss语法 -->
<style lang="scss">

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
