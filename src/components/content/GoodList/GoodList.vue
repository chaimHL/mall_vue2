<template>
  <div class="item-wrap">
    <good-list-item class="item" v-for="item in goodList" :goodObj="item" :key="item.id"></good-list-item>
  </div>
</template>

<script>
  import GoodListItem from 'components/content/GoodList/GoodListItem.vue'
  export default {
    name: 'GoodList',
    components: {
      GoodListItem
    },
    props: {
      goodList: {
        type: Array,
        default: () => {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .item-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0 2px;
  }
  .item-wrap .item {
    width: 48%;
  }
</style>
