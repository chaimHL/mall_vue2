<template>
  <div class="item-box" @click="handleClickItem">
    <div class="img-wrap">
      <img v-lazy="imgSrc" alt="" @load="imgLoad">
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
    computed: {
      imgSrc() {
        return this.goodObj.image || this.goodObj.show.img
      }
    },
    methods: {
      imgLoad() {
        this.$bus.$emit('imgLoad')
      },
      // 点击跳转详情
      handleClickItem() {
        this.$router.push('/details/' + this.goodObj.iid)
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
