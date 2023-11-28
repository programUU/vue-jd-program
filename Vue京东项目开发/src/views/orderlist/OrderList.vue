<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <ul class="orders">
      <!-- 循环遍历数据 -->
      <li class="order">
        <div class="order__title">
          沃尔玛
          <span class="order__status">已取消</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <img src="http://www.dell-lee.com/imgs/vue3/cherry.png" alt="" class="order__content__imgs__img">
            <img src="http://www.dell-lee.com/imgs/vue3/cherry.png" alt="" class="order__content__imgs__img">
            <img src="http://www.dell-lee.com/imgs/vue3/cherry.png" alt="" class="order__content__imgs__img">
            <img src="http://www.dell-lee.com/imgs/vue3/cherry.png" alt="" class="order__content__imgs__img">
          </div>
          <div class="order__content__info">
            <div class="order__content__info__price">&yen;36.88</div>
            <div class="order__content__info__count">共2件</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <!-- 修改底部导航样式 显示当前选中效果 -->
  <DockerComponent :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import get from '../../utils/request'
import DockerComponent from '../../components/DockerComponent.vue'
/* 处理订单列表逻辑 */
const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  /* 异步发送请求 等待获取数据 */
  const getNearbyList = async () => {
    /* 计算了总价 */
    const result = await get('/api/nearbyData')
    /* 获取前验证 */
    if (result?.success && result?.data?.jdData.length) {
      const orderList = result.data
      /* 循环遍历数据 */
      orderList.forEach((order) => {
        const products = order.products || []
        /* 总价 */
        let totalPrice = 0
        /* 总数量 */
        let totalNumber = 0
        products.forEach((productItem) => {
          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
          totalNumber += (productItem?.orderSales || 0)
        })
        /* 添加属性 */
        order.total = totalPrice
        order.totalNumber = totalNumber
      })
      data.list = result.list
    }
  }
  getNearbyList()
  /* 结构赋值 */
  const { list } = toRefs(data)
  return { list }
}
export default {
  name: 'OrderList',
  components: { DockerComponent },
  setup: () => {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  /* 解决定位那个问题 */
  /* 纵向滚动 */
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  background: rgb(248, 248, 248);
}

.title {
  line-height: .44rem;
  background: $content-cart-bgColor;
  color: #333;
  font-size: .16rem;
  text-align: center;
}

.order {
  margin: .16rem .18rem;
  padding: .16rem;
  background: $content-cart-bgColor;

  &__title {
    font-size: .16rem;
    color: $content-font-color;
    line-height: .22rem;
    margin-bottom: .16rem;
  }

  &__status {
    float: right;
    font-size: .14rem;
    color: #999;
  }

  &__content {
    display: flex;

    &__imgs {
      flex: 1;

      &__img {
        width: .4rem;
        height: .4rem;
        margin-right: .12rem;
      }
    }

    &__info {
      text-align: right;
      width: .7rem;

      &__price {
        margin-bottom: .04rem;
        line-height: .20rem;
        font-size: .14rem;
        color: $content-cart-font-color;
      }

      &__count {
        font-size: .12rem;
        color: $content-font-color;
        line-height: .14rem;
      }
    }
  }
}
</style>
