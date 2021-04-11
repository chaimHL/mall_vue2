<!-- 商品详情 -->
<template>
  <div>
    <!-- 顶部导航 -->
    <nav-bar>
      <template #left>
        <div @click="handleClickBack">&lt;</div>
      </template>
      <template #center>
        <div class="nav-wrap">
          <div
            v-for="(item, index) in navTitleList"
            :style="{color: curIndex === index ? 'var(--color-tint)' : ''}"
            @click="handleClickTitle(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
    <scroll class="scroll-wrap" ref="scroll" :probeType="3" @scroll="scroll">
      <div class="banner" v-if="bannerImgs">
        <img :src="bannerImgs[0]" alt="" @load="imgLoad">
      </div>
      <detail-base-info :good-info="goodInfo" />
      <div class="detail-wrap">
        <div v-for="item in detailList" class="detail-img">
          <img :src="item" alt="" @load="detailImgLoad">
        </div>
      </div>
      <!-- 评论 -->
      <div class="comment-box" ref="comment">
        <div class="comment-title">用户评价</div>
        <div v-if="comment" class="comment-item">
          <!-- 时间 -->
          <div>{{ comment.created | fomateDate('yy-MM-dd') }}</div>
          <div>{{ comment.content }}</div>
        </div>
        <div v-else class="comment-item">等你来评~</div>
      </div>
      <!-- 推荐 -->
      <div class="recommend-title">猜你喜欢</div>
      <good-list :goodList="recommend" ref="recommend" />
    </scroll>
    <back-to-top v-show="showBackToTop" @click.native="handleBackToTop" />
    <!-- 底部按钮栏 -->
    <detail-bottom-bar @addToCart="listenAddToCart" />
  </div>
</template>

<script>
  import NavBar from '@/components/common/NavBar/NavBar.vue'
  import Scroll from 'components/common/Scroll/Scroll.vue'
  import GoodList from '@/components/content/GoodList/GoodList.vue'
  import DetailBaseInfo from './components/DetailBaseInfo.vue'
  import DetailBottomBar from './components/DetailBottomBar.vue'
  import { getDetailData, GoodInfo, getDetailRecommend } from '@/api/details.js'
  import { fomateDate } from '@/filters/index.js'
  import { backTopMixin } from '@/common/mixin.js'
  import { mapActions } from 'vuex'

  export default {
    name: 'Details',
    components: {
      NavBar,
      Scroll,
      GoodList,
      DetailBaseInfo,
      DetailBottomBar
    },
    filters: {
      fomateDate
    },
    mixins: [backTopMixin],
    data() {
      return {
        navTitleList: ['商品', '评论', '推荐'],
        curIndex: 0,
        bannerImgs: null,
        goodId: null,
        goodInfo: {},
        detailList: [],
        count: 0, // 计算详情图片个数
        detailListLength: 0,
        comment: {},
        recommend: [],
        scrollY: [], // 各个区域的 offsetTop 值
        positionY: 0 // 当前页面位置
      }
    },
    watch: {
      // 获取商品详情的所有图片的个数，之所以专门弄个 watch，是为了只计算一次 length 就好
      detailList(newVal) {
        this.detailListLength = newVal.length
      }
    },
    created() {
      // 获取商品 id
      this.goodId = this.$route.params.id
      getDetailData(this.goodId).then(res => {
        const data = res.result
        // banner
        this.bannerImgs = data.itemInfo.topImages
        this.goodInfo = new GoodInfo(data.itemInfo, data.columns)
        // 商品细节介绍
        this.detailList = data.detailInfo.detailImage[0].list
        // 用户评价
        this.comment = data.rate.list ? data.rate.list[0] : ''
      })
      // 获取商品推荐
      getDetailRecommend().then(res => {
        this.recommend = res.data.list
      })
    },
    methods: {
      ...mapActions(['addCart']),
      handleClickTitle(index) {
        this.curIndex = index
        // 点击顶部标题导航，滚动到相应位置
        this.$refs.scroll.scrollTo(0, this.scrollY[index])
      },
      // 点击顶部导航栏返回键
      handleClickBack() {
        this.$router.back()
      },
      // 监听 banner 加载完成
      imgLoad() {
        this.$refs.scroll.refresh()
      },
      // 监听详情图片加载完成
      detailImgLoad() {
        // 等商品详情的所有图片加载完成，只需调用一次 refresh
        if (++this.count === this.detailListLength) {
          this.$refs.scroll.refresh()
          // 计算各个部分的 offsetTop
          const commentTop = this.$refs.comment.offsetTop
          // 获取组件的 offsetTop 要用 $el
          const recommendTop = this.$refs.recommend.$el.offsetTop
          this.scrollY.push(0, -commentTop, -recommendTop, -Number.MAX_VALUE)
        }
      },
      // 监听页面滚动
      scroll(position) {
        const y = -position.y
        const length = this.scrollY.length
        // for (let i in this.scrollY) {
        //   // i 是字符串
        //   i = parseInt(i)
        //   /**
        //    * (this.curIndex !== i) 避免重复的判断
        //    * (i < length - 1) 和 (i === length-1) 为或的关系，因为最后一个标题是否高亮是需要判断当前页面的 y 值是不是大于最后一个内容的 offsetTop
        //    * 而其他的标题是否高亮需要判断当前页面的 y 值是否在对应标题的内容范围内
        //    */
        //   if ((this.curIndex !== i) && (((i < length - 1) && (y >= -this.scrollY[i] && y < -this.scrollY[i+1])) || ((i === length-1) && y >= -this.scrollY[i]))) {
        //     this.curIndex = i
        //   }
        // }

        /**
         * 上面这个 if 判断太长了，我们可以做如下简化
         * 思路，在 this.scrollY 数组的最后添加一个很大的值（Number.MAX_VALUE），那么就不要单独判断最后一标题的情况了
         * this.scrollY.length - 1 中的 -1 是因为最后一项 Number.MAX_VALUE 不需要参与循环
         */

        for (let i = 0; i < this.scrollY.length - 1; i++) {
          /**
           * (this.curIndex !== i) 避免重复的判断
           * (i < length - 1) 和 (i === length-1) 为或的关系，因为最后一个标题是否高亮是需要判断当前页面的 y 值是不是大于最后一个内容的 offsetTop
           * 而其他的标题是否高亮需要判断当前页面的 y 值是否在对应标题的内容范围内
           */
          if ((this.curIndex !== i) && (y >= -this.scrollY[i] && y < -this.scrollY[i+1])) {
            this.curIndex = i
          }
        }
        // 回到顶部
        this.showBackTop(position)
      },
      // 监听加入购物车按钮
      listenAddToCart() {
        const goodObj = {
          id: this.goodId,
          img: this.bannerImgs[0],
          title: this.goodInfo?.title, // ?.是可选链
          price: this.goodInfo?.price,
          lowPrice: this.goodInfo?.lowPrice
        }
        // this.$store.dispatch('addCart', goodObj)
        this.addCart(goodObj).then(res => {
          this.$toast.showToast(res)
        })
      }
    }
  }
</script>

<style scoped>
  .nav-wrap {
    display: flex;
    justify-content: space-around;
  }
  .banner {
    height: 360px;
  }
  .banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .scroll-wrap {
    position: absolute;
    top: 44px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .detail-img img {
    width: 100%;
  }
  .comment-box {
    border-top: 10px solid #efefef;
    margin-bottom: 100px;
  }
  .comment-title, .recommend-title {
    font-size: 16px;
    font-weight: bold;
    margin: 16px 20px;
  }
  .comment-item {
    padding: 0 20px;
    font-size: 14px;
  }
  .comment-item div {
    margin-bottom: 12px;
  }
</style>
