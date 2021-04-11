<template>
  <div class="toast-box" v-if="isShow">
    {{ message }}
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      showToast(message, duration = 1500) {
        this.message = message
        this.isShow = true
        setTimeout(() => {
          this.isShow = false
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    padding: 4px 10px;
    background-color: rgba(0, 0, 0, .75);
    color: #FFFFFF;
  }
</style>
