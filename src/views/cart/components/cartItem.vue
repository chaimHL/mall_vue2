<template>
  <div class="item-box">
    <div class="check" :class="{active: checked}"></div>
    <div class="img-box">
      <img :src="goodInfo.img" alt="">
    </div>
    <div class="good-text">
     <div class="title">{{ goodInfo.title }}</div>
     <div class="price">
       {{ goodInfo.lowPrice }}
       <span>*{{ goodInfo.count }}</span>
     </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CartItem',
    props: {
      goodInfo: {
        type: Object,
        default: () => {
          return {}
        }
      },
      checked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .item-box {
    display: flex;
    height: 110px;
    margin-bottom: 16px;
  }
  .check {
    flex-shrink: 0;
    margin: 0 10px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #FFFFFF;
    border: 1px solid var(--color-tint);
  }
  .check.active {
    background-color: var(--color-tint);
  }
  .img-box {
    width: 90px;
    flex-shrink: 0;
  }
  .img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .good-text {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .title {
    font-size: 16px;
    line-height: 1.3;
  }
  .price {
    color: var(--color-tint);
    font-weight: 700;
    font-size: 16px
  }
</style>
