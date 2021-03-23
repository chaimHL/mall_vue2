<template>
  <div class="item-box">
    <div class="img-wrap">
      <img :src="goodObj.show.img" alt="" @load="imgLoad">
    </div>
    <div class="item-text">{{ goodObj.title }}</div>
  </div>
</template>

<script>
  export default {
    name: 'GoodListItem',
    props: {
      goodObj: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      imgLoad() {
        this.$bus.$emit('imgLoad')
      }
    }
  }
</script>

<style scoped>
  .item-box {
    margin-bottom: 20px;
  }
  .img-wrap {
    width: 100%;
    height: 300px;
    overflow: hidden;
  }
  .img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .item-text {
    margin-top: 6px;
    padding: 0 2px;
    font-size: 14px;
  }
</style>
