<template>
  <tab-bar>
    <tab-bar-item path="/home" avtiveColor="#d4237a">
      <template #icon>
        <img src="@/assets/imgs/tabbar/index.svg" alt="">
      </template>
      <template #icon-o>
        <img src="@/assets/imgs/tabbar/index-o.svg" alt="">
      </template>
      <template #text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category" avtiveColor="#d4237a">
      <template #icon>
        <img src="@/assets/imgs/tabbar/category.svg" alt="">
      </template>
      <template #icon-o>
        <img src="@/assets/imgs/tabbar/category-o.svg" alt="">
      </template>
      <template #text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart" avtiveColor="#d4237a">
      <template #icon>
        <img src="@/assets/imgs/tabbar/cart.svg" alt="">
      </template>
      <template #icon-o>
        <img src="@/assets/imgs/tabbar/cart-o.svg" alt="">
      </template>
      <template #text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile" avtiveColor="#d4237a">
      <template #icon>
        <img src="@/assets/imgs/tabbar/mine.svg" alt="">
      </template>
      <template #icon-o>
        <img src="@/assets/imgs/tabbar/mine-o.svg" alt="">
      </template>
      <template #text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from '@/components/common/TabBar/TabBar.vue'
import TabBarItem from '@/components/common/TabBarItem/TabBarItem.vue'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
