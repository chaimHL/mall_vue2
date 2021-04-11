<template>
  <div class="bottom-bar">
    <div class="check-box">
      <div
        class="check"
        :class="{active: allChecked}"
        @click="handleClickAll"
      >
      </div>
      全选
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate">立即购买({{ checkNum }})</div>
   </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'CartBottomBar',
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList.filter(item => item.check).reduce((prev, cur) => {
          return prev += cur.lowPrice * cur.count
        }, 0).toFixed(2)
      },
      checkNum() {
        return this.cartList.filter(item => item.check).length
      },
      // 全选
      allChecked() {
        if(this.cartList.length === 0) {
          return false
        }
        return !this.cartList.find(item => !item.check)
      }
    },
    methods: {
      handleClickAll() {
        if (this.allChecked) {
          this.cartList.forEach(item => item.check = false)
        } else {
          this.cartList.forEach(item => item.check = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #EFEFEF;
    height: 40px;
  }
  .check-box {
    display: flex;
    align-items: center;
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
</style>
