import { BACKTOP_DISTANCE } from '@/common/const.js'
import BackToTop from 'components/common/BackToTop/BackToTop'

// 回到顶部
export const backTopMixin = {
  components: {
    BackToTop
  },
  data() {
    return {
      showBackToTop: false,
    }
  },
  methods: {
    // 回到顶部
    handleBackToTop() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    // 回到顶部的显示隐藏
    showBackTop(position) {
      this.showBackToTop = Math.abs(position.y) > BACKTOP_DISTANCE
    }
  }
}
