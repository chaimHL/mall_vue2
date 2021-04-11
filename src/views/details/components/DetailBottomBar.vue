<template>
  <div class="bottom-bar" @click="handleClickAddToCart">
    加入购物车
  </div>
</template>

<script>
  export default {
    name: 'DetailBottomBar',
    methods: {
      handleClickAddToCart() {
        this.$emit('addToCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    line-height: 50px;
    text-align: center;
    background-color: var(--color-tint);
    color: #FFFFFF;
  }
</style>
