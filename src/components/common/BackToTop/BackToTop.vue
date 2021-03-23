<template>
  <div class="to-top">
    Top
  </div>
</template>

<script>
  export default {
    name: 'BackToTop'
  }
</script>

<style scoped>
  .to-top {
    width: 50px;
    height: 50px;
    background-color: #FFFFFF;
    color: var(--color-tint);
    position: fixed;
    bottom: 70px;
    right: 10px;
    z-index: 9;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }
</style>
