<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'

  BScroll.use(Pullup)

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        bs: null
      }
    },
    mounted() {
      // 创建 BScroll 对象
      this.bs = new BScroll(this.$refs.wrapper, {
        click : true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 监听实时滚动
      if (this.probeType === 2 || this.probeType===3) {
        this.bs && this.bs.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }
      // 监听上拉事件
      if (this.pullUpLoad) {
        this.bs && this.bs.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      // 滚动
      scrollTo(x, y, time = 300) {
        this.bs && this.bs.scrollTo(x, y, time)
      },
      // 结束上拉加载
      finishPullUp() {
        this.bs && this.bs.finishPullUp()
      },
      // 重新计算可滚动高度，也就是bs.scrollerHeight 属性
      refresh() {
        this.bs && this.bs.refresh()
      },
      // 获取当前 bs 纵轴坐标
      getBetterScrollY() {
        return this.bs ? this.bs.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
