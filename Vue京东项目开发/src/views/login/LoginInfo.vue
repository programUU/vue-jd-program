<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="">
    <div class="wrapper__input">
      <input type="text" v-model="username" placeholder="请输入用户名" class="wrapper__input__content">
    </div>
    <div class="wrapper__input">
      <input type="password" v-model="password" placeholder="请输入密码" class="wrapper__input__content" autocomplete="new-password">
    </div>
    <div class="wrapper__login--button" @click="handleLogin">登陆</div>
    <div class="wrapper__register--button" @click="handleRegister">立即注册</div>
  </div>
  <!-- 向子组件传递参数 -->
  <ToastComponent v-if="showToast" :content="toastmessage" />
</template>

<script>
/* vue-router 提供的方法 */
/* 导入弹窗组件 */
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import ToastComponent, { useToastEffect } from '../../components/TostComponent.vue'
import post from '../../utils/request'

/* 处理登录相关逻辑 */
const useLoginEffect = (changeToast) => {
  /* 双向绑定 输入框的内容 */
  const data = reactive({
    username: '',
    password: ''
  })
  /* 结构赋值 data 让参数更有语义 */
  /* 取值叫给底层 */
  const { username, password } = toRefs(data)
  /* 获取路由的实例 */
  const router = useRouter()
  /* 发送 post 请求 */
  /*  异步操作 */
  const handleLogin = async () => {
    try {
      if (!username.value || !password.value) {
        changeToast('账号密码不能为空！')
        return
      }
      /* 代码优化 */
      /* 等待 post 解析完毕 */
      const result = await post('/api/getData', {
        username, password
      })
      if (result?.success) {
        localStorage.isLogin = true
        router.push({ name: 'home' })
      } else {
        changeToast('登录失败')
      }
    } catch (e) {
      changeToast('发送失败')
    }
  }
  return { username, password, handleLogin }
}
/* 注册跳转 */
const useRegisterEffec = () => {
  /* 获取路由的实例 */
  const router = useRouter()
  /* 点击注册跳转页面 */
  const handleRegister = () => {
    router.push({ name: 'register' })
  }
  return { handleRegister }
}

export default {
  name: 'LoginInfo',
  components: {
    ToastComponent
  },
  /* 职责：告诉你代码执行的流程 */
  setup () {
    /* 获取关于toast使用的方法和数据 */
    const { showToast, toastmessage, changeToast } = useToastEffect()
    /* 获取登录相关的方法和数据 */
    const { username, password, handleLogin } = useLoginEffect(changeToast)
    /* 获取注册跳转页面的方法 */
    const { handleRegister } = useRegisterEffec()

    return {
      handleLogin, handleRegister, username, password, showToast, toastmessage
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  /* 在不知道宽高多大的时候设置垂直居中 */
  position: absolute;
  /* display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column; */
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  &__img {
    width: .66rem;
    height: .66rem;
    /*想使用margin调整位置 需要变成块元素 */
    display: block;
    margin: 0 auto .4rem auto;
  }

  &__input {
    height: .48rem;
    padding: 0 .16rem;
    background: #f9f9f9;
    border: .01rem solid rgba(0, 0, 0, 0.10);
    border-radius: .06rem;
    margin: 0 .4rem .16rem .4rem;

    &__content {
      margin-top: .12rem;
      line-height: .22rem;
      width: 100%;
      border: none;
      outline: none;
      background: none;
      font-size: .16rem;
      color: $content-notice-font-color;

      &::placeholder {
        color: $content-notice-font-color;
      }
    }
  }

  &__login--button {
    background: #0091FF;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    color: #fff;
    margin: .16rem .4rem .16rem .4rem;
    line-height: .48rem;
    text-align: center;
    font-size: .16rem;
  }

  &__register--button {
    font-size: .14rem;
    color: $content-notice-font-color;
    text-align: center;
  }
}
</style>
