import { createRouter, createWebHashHistory } from 'vue-router'
/* 登录页面 */
import LoginInfo from '../views/login/LoginInfo.vue'
/* 注册页面 */
import RegisterInfo from '../views/register/RegisterInfo.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    /* 懒加载 */
    component: () => import(/* webpackChunkName: "home" */ '../views/home/HomeComponent.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */'../views/cart/CartList.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LoginInfo,
    /* 只有访问 Login 页面之前才会执行 */
    /* 那么这个 to 指的就是自己 */
    /* 双判断呗 */
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage
      /* 三元运算符 */
      isLogin ? next({ name: 'Home' }) : next()
      /* 如果已经登录了 */
      /* 跳转首页 */
      // if (isLogin) {
      //   next({ name: 'Home' })
      // } else {
      //   /* 没有登录那就正常执行 */
      //   next()
      // }
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterInfo
  },
  {
    /* 跳转到哪个商品 */
    path: '/shop/:id',
    name: 'shop',
    /* 懒加载 */
    /* 只有访问的时候才会加载 */
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/ShopInfo.vue')
  },
  {
    /* 跳转到哪个商品 */
    path: '/orderList',
    name: 'orderList',
    /* 懒加载 */
    /* 只有访问的时候才会加载 */
    component: () => import(/* webpackChunkName: "shop" */ '../views/orderlist/OrderList.vue')
  },
  {
    path: '/order/:id',
    name: 'order',
    component: () => import(/* webpackChunkName: "order" */'../views/order/OrderCreation.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

/* 不管什么路由切换的时候都要执行 */
/* 路由守卫 */
router.beforeEach((to, from, next) => {
  /* to表示即将跳转的页面信息 */
  /* from 表示从哪里跳转 */
  /* next 每次跳转之前就要执行这个方法 */
  /* to.name 表示即将跳转的页面的名字 */
  /* 从本地存储获取登录状态 */
  const { isLogin } = localStorage
  if (!isLogin && (to.name !== 'login' && to.name !== 'register')) {
    /* 第一次没登陆肯定得显示一个登陆界面吧 */
    /* 即使没有登录 只要即将跳转的页面是 Login 那么可以继续跳转到登录页 */
    next({ name: 'login' })
  } else {
    /* 如果没有登录 强制跳转到登录页面 */
    next()
  }
})

export default router
