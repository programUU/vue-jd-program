<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" alt="">
    <div class="wrapper__input">
      <input type="text" placeholder="请输入用户名" class="wrapper__input__content" v-model="username">
    </div>
    <div class="wrapper__input">
      <input type="password" placeholder="请输入密码" class="wrapper__input__content" v-model="password"
        autocomplete="new-password">
    </div>
    <div class="wrapper__input">
      <input type="password" placeholder="确认密码" class="wrapper__input__content" v-model="ensurepassword">
    </div>
    <div class="wrapper__register--button" @click="handleRegister">注册</div>
    <div class="wrapper__login--button" @click="handleLogin">已有帐号去登陆</div>
  </div>
  <ToastComponent v-if="showToast" :content="toastmessage" />
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import ToastComponent, { useToastEffect } from '../../components/TostComponent.vue'
import post from '../../utils/request'

/* 处理注册相关逻辑 */
const useRegisterEffect = (changeToast) => {
  /* 获取路由的实例 */
  const router = useRouter()
  /* 双向绑定 输入框的内容 */
  const data = reactive({
    username: '',
    password: '',
    ensurepassword: ''
  })
  /* 结构赋值 data 让参数更有语义 */
  /* 取值叫给底层 */
  const { username, password, ensurepassword } = toRefs(data)
  /* 发送 post 请求 */
  /*  异步操作 */
  const handleRegister = async () => {
    try {
      const regexp = /^[A-Z]{1}[a-z A-Z 0-9]{5,}$/
      if (!username.value || !password.value || !ensurepassword.value) {
        changeToast('用户名或者密码不能为空！')
        return
      } else if (!regexp.test(username.value)) {
        changeToast('用户名首个字母必须大写,至少6位！！')
        return
      } else if (ensurepassword.value !== password.value) {
        changeToast('两次密码不一致')
        return
      }
      /* 代码优化 */
      /* 等待 post 解析完毕 */
      const result = await post('/api/user/register', {
        username, password
      })
      if (result?.success) {
        router.push({ name: 'login' })
      } else {
        changeToast('注册失败')
      }
    } catch (e) {
      changeToast('发送失败')
    }
  }
  return { username, password, ensurepassword, handleRegister }
}

/* 跳转登录页面 */
const useLoginEffect = () => {
  /* 获取路由的实例 */
  const router = useRouter()
  const handleLogin = () => {
    router.push({ name: 'login' })
  }
  return { handleLogin }
}
/* 导出组件 */
export default {
  name: 'RegisterInfo',
  components: { ToastComponent },
  setup () {
    /* 获取关于toast使用的方法和数据 */
    const { showToast, toastmessage, changeToast } = useToastEffect()
    /* 获取注册的方法 */
    const { username, password, ensurepassword, handleRegister } = useRegisterEffect(changeToast)
    /* 获取跳转登录页面的方法 */
    const { handleLogin } = useLoginEffect()

    return { handleLogin, handleRegister, username, password, ensurepassword, showToast, toastmessage }
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
  align-items: center;
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

  &__register--button {
    background: #0091FF;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    color: #fff;
    margin: .16rem .4rem .16rem .4rem;
    line-height: .48rem;
    text-align: center;
    font-size: .16rem;
  }

  &__login--button {
    font-size: .14rem;
    color: $content-notice-font-color;
    text-align: center;
  }
}
</style>
