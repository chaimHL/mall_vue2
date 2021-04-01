<template>
  <div>
    分类
    <div class="fixed">1111</div>
    <main-tab-bar />
  </div>
</template>

<script>
  import MainTabBar from '@/components/content/MainTabBar/MainTabBar.vue'
  export default {
    name: 'Category',
    components: {
      MainTabBar
    }
  }
</script>

<style scoped>
  .fixed {
    position: fixed;
    top: 200px;
    transform: translateY(100px);
  }
</style>
