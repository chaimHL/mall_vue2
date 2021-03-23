<template>
  <div class="tab-bar-item" @click="handleClick">
    <div class="icon" v-if="!isActive">
      <slot name="icon"></slot>
    </div>
    <div class="icon-o" v-else>
      <slot name="icon-o"></slot>
    </div>
    <div class="text" :style="activeColor">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabbarItem',
    props: {
      path: {
        type: String,
        require: true
      },
      avtiveColor: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.includes(this.path)
      },
      activeColor() {
        return this.isActive ? { color: this.avtiveColor } : {}
      }
    },
    methods: {
      handleClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item div {
    text-align: center;
  }
  .tab-bar-item .icon-o {
    color: var(--color-high-text);
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
