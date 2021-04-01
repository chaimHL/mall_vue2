<template>
  <div class="base-info" v-if="Object.keys(goodInfo).length">
    <div class="title">{{ goodInfo.title }}</div>
    <div class="price">{{ goodInfo.price }}</div>
    <div class="columns">
      <span v-for="index in goodInfo.columns.length - 1">
        {{ goodInfo.columns[index - 1] }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goodInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    padding: 14px 20px;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    line-height: 1.5;
    margin-bottom: 6px;
  }
  .price {
    color: var(--color-tint);
    font-size: 30px;
    font-weight: bold;
  }
  .columns {
    margin-top: 12px;
  }
  .columns span {
    margin-right: 16px;
    font-size: 14px;
    color: #999;
  }
</style>
