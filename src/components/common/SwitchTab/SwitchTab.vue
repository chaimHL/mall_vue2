<template>
  <div class="tab-box">
    <div class="tab-item" :class="{ active: currentIndex === index }" v-for="(item, index) in tabTitle" @click="handleClick(index)">{{ item }}</div>
  </div>
</template>

<script>
  export default {
    name: 'SwitchTab',
    props: {
      tabTitle: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      handleClick(index) {
        this.currentIndex = index
				this.$emit('changeTab', index)
      }
    }
  }
</script>

<style scoped>
  .tab-box {
    display: flex;
    justify-content: space-around;
    background-color: #FFFFFF;
    height: 44px;
    line-height: 44px;
  }
  .tab-item {
    padding: 4px 2px;
  }
  .active {
    border-bottom: 2px solid var(--color-tint);
  }
</style>
