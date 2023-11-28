<!-- 实现弹窗共功能 -->

<template>
  <!-- 这个内容应该是传递的数据 -->
  <div class="toast">{{ content }}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'ToastComponent',
  props: ['content']/* ,
  setup (props, content) {
    console.log(props)
  } */
}

/* 封装 toast */
export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastmessage: ''
  })
  /* 改变Toast的展示 */
  const changeToast = (info) => {
    /* 请求失败展示弹窗 */
    toastData.showToast = true
    toastData.toastmessage = info
    /* 3秒后弹窗消失 */
    setTimeout(() => {
      toastData.showToast = false
    }, 2000)
  }

  /* 结构赋值toastData */
  const { showToast, toastmessage } = toRefs(toastData)
  return { showToast, changeToast, toastmessage }
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  background: rgba($color: #000000, $alpha: .35);
  padding: .1rem;
  border-radius: .05rem;
  color: #fff;
  z-index: 666;
}
</style>
