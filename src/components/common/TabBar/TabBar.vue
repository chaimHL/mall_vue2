<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: 'Tabbar',
    components: {

    }
  }
</script>

<style scoped>
  .tab-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f6f6f6;
    height: 50px;
    box-shadow: 0 -1px 3px rgba(0,0,0,.08);
  }
</style>
